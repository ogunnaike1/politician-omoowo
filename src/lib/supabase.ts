import { createClient, SupabaseClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import type { Database } from "./database.types";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} env var is not set`);
  return value;
}

let client: SupabaseClient<Database> | null = null;

/**
 * Server-only Supabase client using the service role key — bypasses Row Level
 * Security. Never import this from a "use client" component or expose the
 * service role key to the browser.
 *
 * Lazily instantiated (via Proxy) so that merely importing this module
 * doesn't throw when env vars aren't set yet — e.g. during `next build`'s
 * page-data collection, which imports route handlers without running them.
 */
function getClient(): SupabaseClient<Database> {
  if (!client) {
    client = createClient<Database>(getEnv("NEXT_PUBLIC_SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false },
      // Node 20 has no native WebSocket global; supabase-js's realtime client
      // needs one even though this app never subscribes to realtime channels.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      realtime: { transport: WebSocket as any },
    });
  }
  return client;
}

export const supabase: SupabaseClient<Database> = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver);
  },
});
