import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { jsonError, parseBody } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { name, email, phone, subject, message } = body as Record<string, unknown>;
  if (!name || !email || !subject || !message) {
    return jsonError("name, email, subject, and message are required");
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return jsonError("A valid email address is required");
  }

  const { data: saved, error } = await supabase
    .from("contact_messages")
    .insert({
      name: name as string,
      email,
      phone: (phone as string) || null,
      subject: subject as string,
      message: message as string,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);

  const { data: settings } = await supabase.from("site_settings").select("contact_email").eq("id", 1).maybeSingle();
  const notifyTo = settings?.contact_email || "contact@omoowo2027.ng";

  try {
    await sendEmail({
      to: notifyTo,
      replyTo: email,
      subject: `[Contact Form] ${subject} — ${name}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name as string)} &lt;${escapeHtml(email)}&gt;</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone as string)}</p>` : ""}
        <p><strong>Subject:</strong> ${escapeHtml(subject as string)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message as string).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (err) {
    // The message is already saved — don't fail the request just because email delivery failed.
    console.error("Failed to send contact notification email:", err);
  }

  return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
