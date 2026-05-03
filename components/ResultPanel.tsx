"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calculator, FileText, Ship, TrendingUp, Weight, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCBM, formatCurrency } from "@/lib/currency";
import type { CurrencyCode, FreightCalculation } from "@/types";

type ResultPanelProps = {
  currency: CurrencyCode;
  result: FreightCalculation | null;
};

function ResultRow({
  icon: Icon,
  label,
  value,
  highlighted = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors",
        highlighted
          ? "border-[#13B8A6]/20 bg-[#13B8A6]/10 text-[#0F766E] dark:border-[#13B8A6]/30 dark:bg-[#13B8A6]/15 dark:text-[#7DDDD3]"
          : "border-slate-200 bg-slate-50 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900">
          <Icon className="size-4" />
        </span>
        <span className="truncate text-sm font-semibold">{label}</span>
      </div>
      <span className="shrink-0 text-sm font-bold">{value}</span>
    </div>
  );
}

export default function ResultPanel({ currency, result }: ResultPanelProps) {
  return (
    <Card id="breakdown" className="h-full overflow-hidden border-[#0B1F3A]/10">
      <CardHeader className="bg-[#0B1F3A] text-white">
        <CardTitle className="flex items-center gap-3 text-white">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
            <TrendingUp className="size-5 text-[#F59E0B]" />
          </span>
          Cost breakdown
        </CardTitle>
        <CardDescription className="text-slate-300">
          Chargeable CBM uses the greater value between weight CBM and actual volume.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={`${result.totalCost}-${currency}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              <ResultRow icon={Weight} label="Weight CBM" value={formatCBM(result.weightCBM)} />
              <ResultRow icon={Ship} label="Volume CBM" value={formatCBM(result.actualCBM)} />
              <ResultRow
                icon={Calculator}
                label="Chargeable CBM"
                value={formatCBM(result.chargeableCBM)}
                highlighted
              />
              <ResultRow
                icon={Ship}
                label="Freight Cost"
                value={formatCurrency(result.freightCost, currency)}
              />
              {result.documentationFee > 0 ? (
                <ResultRow
                  icon={FileText}
                  label="Documentation Fee"
                  value={formatCurrency(result.documentationFee, currency)}
                />
              ) : null}

              <Separator className="my-5" />

              <div className="rounded-[24px] bg-[#0B1F3A] p-5 text-white shadow-[0_22px_55px_rgba(11,31,58,0.22)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#13B8A6]">Total Cost</p>
                    <p className="mt-1 text-xs text-white/65">Estimated freight value in {currency}</p>
                  </div>
                  <motion.p
                    initial={{ scale: 0.96 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-3xl font-black tracking-normal sm:text-4xl"
                  >
                    {formatCurrency(result.totalCost, currency)}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[430px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/15 dark:bg-white/5"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#13B8A6]/10 text-[#0F766E]">
                <Calculator className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
                Your estimate appears here
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
                Enter shipment details and calculate to see chargeable CBM, fees, and total cost.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
