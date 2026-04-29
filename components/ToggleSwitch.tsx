"use client";

type ToggleSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
};

export default function ToggleSwitch({ checked, onCheckedChange, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-gray-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
    >
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span
        className={[
          "relative inline-flex h-7 w-12 shrink-0 rounded-full p-1 transition-colors duration-300 ease-out",
          checked ? "bg-emerald-500" : "bg-gray-300",
        ].join(" ")}
      >
        <span
          className={[
            "size-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out",
            checked ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
