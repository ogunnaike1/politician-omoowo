import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { jsonError, parseBody } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { email } = body as Record<string, unknown>;
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return jsonError("A valid email address is required");
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  // A duplicate email (already subscribed) is not an error from the user's point of view.
  if (error && error.code !== "23505") {
    return jsonError(error.message, 500);
  }

  try {
    await sendEmail({
      to: email,
      subject: "You're on the list — Omoowo 2027",
      html: `
        <p>Thanks for signing up.</p>
        <p>You'll now receive statements, updates, and event notices from the Omoowo 2027 campaign directly in your inbox.</p>
        <p>— Omoowo 2027 Campaign</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send newsletter confirmation email:", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
