"use client";

import { motion } from "framer-motion";
import type { FreightCalculation } from "@/types";

type ResultPanelProps = {
  actualVolume: number;
  result: FreightCalculation;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const cbmFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function MetricRow({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 rounded-2xl px-4 py-3",
        highlighted
          ? "border border-sky-100 bg-sky-50 text-sky-900"
          : "border border-gray-100 bg-gray-50 text-gray-800",
      ].join(" ")}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

export default function ResultPanel({ actualVolume, result }: ResultPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-3 pt-2"
    >
      <MetricRow label="Weight CBM" value={cbmFormatter.format(result.weightCBM)} />
      <MetricRow label="Actual Volume (CBM)" value={cbmFormatter.format(actualVolume)} />
      <MetricRow
        label="Chargeable CBM"
        value={cbmFormatter.format(result.chargeableCBM)}
        highlighted
      />
      <MetricRow label="Freight Cost" value={currencyFormatter.format(result.freightCost)} />
      {result.documentationFee > 0 ? (
        <MetricRow
          label="Documentation Fee"
          value={currencyFormatter.format(result.documentationFee)}
        />
      ) : null}
      <div className="rounded-[20px] bg-gray-950 px-5 py-5 text-white shadow-lg shadow-gray-950/10">
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm font-medium text-gray-300">Total Cost</span>
          <span className="text-2xl font-bold tracking-normal sm:text-3xl">
            {currencyFormatter.format(result.totalCost)}
          </span>
        </div>
      </div>
    </motion.section>
  );
}
