export const inputClass =
  "w-full border border-[#DCDCDC] px-3 py-2 text-sm outline-none focus:border-[#008B4D] transition-colors";

export const labelClass = "block text-[11px] font-medium tracking-wide uppercase text-[#888888] mb-1.5";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block mb-5">
      <span className={labelClass}>{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-[#888888] mt-1">{hint}</span>}
    </label>
  );
}

export function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-semibold text-[#1A1A1A]">{title}</h1>
      {action}
    </div>
  );
}

export function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never },
) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-[#008B4D] text-white text-sm font-medium hover:bg-[#006B3A] transition-colors disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 border border-[#DCDCDC] text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-colors disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-[#E63035] text-white text-sm font-medium hover:bg-[#c22226] transition-colors disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}
