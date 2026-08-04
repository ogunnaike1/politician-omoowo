import { Resend } from "resend";

let client: Resend | null = null;

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY env var is not set");
  if (!client) client = new Resend(apiKey);
  return client;
}

/** Sender address for all outgoing mail. Override with RESEND_FROM_EMAIL once you verify a domain in Resend. */
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Omoowo 2027 <onboarding@resend.dev>";

export async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const resend = getClient();
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.replyTo && { replyTo: opts.replyTo }),
  });
  if (error) throw new Error(error.message);
}
