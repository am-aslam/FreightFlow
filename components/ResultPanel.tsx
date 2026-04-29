"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { FreightCalculation } from "@/types";

type ResultPanelProps = {
  result: FreightCalculation;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const cbmFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function useCountUp(value: number, duration = 700) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      start ??= timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return displayValue;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-950">{value}</span>
    </div>
  );
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const animatedTotal = useCountUp(result.totalCost);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-md shadow-gray-900/10 sm:p-8"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Calculation breakdown
          </p>
          <h2 className="text-xl font-bold text-gray-950">Input to billing value</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Weight CBM</p>
            <p className="mt-2 text-lg font-semibold text-gray-950">
              {cbmFormatter.format(result.weightCBM)}
            </p>
            <p className="mt-1 text-xs font-medium text-gray-500">Weight CBM = weight / 500</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Actual CBM</p>
            <p className="mt-2 text-lg font-semibold text-gray-950">
              {cbmFormatter.format(result.actualCBM)}
            </p>
            <p className="mt-1 text-xs font-medium text-gray-500">user entered volume</p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700">-&gt; Chargeable CBM</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-600">
                Chargeable CBM = max(weight CBM, actual CBM)
              </p>
            </div>
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Billing Value
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <span className="text-sm font-medium text-blue-700">Used for billing</span>
            <span className="text-3xl font-bold text-blue-700 sm:text-4xl">
              {cbmFormatter.format(result.chargeableCBM)}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div className="divide-y divide-gray-200">
          <DetailRow label="Freight Cost" value={currencyFormatter.format(result.freightCost)} />
          <DetailRow
            label="Documentation Fee"
            value={currencyFormatter.format(result.documentationFee)}
          />
        </div>

        <div className="border-t border-gray-200" />

        <div className="rounded-xl bg-gray-950 px-5 py-5 text-white shadow-md shadow-gray-950/10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <span className="text-sm font-semibold text-gray-300">Total Cost</span>
            <span className="text-3xl font-bold tracking-normal text-emerald-300 sm:text-4xl">
              {currencyFormatter.format(animatedTotal)}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
