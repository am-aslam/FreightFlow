"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock3, Globe2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const checkpoints = [
  { icon: Globe2, label: "Origin", value: "Guangzhou" },
  { icon: ShieldCheck, label: "Transit", value: "Compliant" },
  { icon: Clock3, label: "Port", value: "Jebel Ali" },
];

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative"
    >
      <div className="overflow-hidden rounded-[32px] border border-white/14 bg-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.28)] backdrop-blur">
        <div className="border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#F59E0B]" />
              <span className="size-3 rounded-full bg-[#13B8A6]" />
              <span className="size-3 rounded-full bg-white/35" />
            </div>
            <Badge className="border-white/10 bg-white/10 text-white">Live estimate</Badge>
          </div>
        </div>

        <div className="bg-white p-3 dark:bg-slate-950 sm:p-4">
          <video
            className="aspect-video h-auto w-full rounded-[22px] bg-transparent object-contain mix-blend-multiply dark:mix-blend-screen"
            src="/freightflow-visual.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Animated logistics freight visual"
          />
        </div>

        <div className="grid grid-cols-3 gap-px bg-white/10">
          {checkpoints.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="bg-[#0B1F3A] p-4">
                <Icon className="mb-3 size-4 text-[#13B8A6]" />
                <p className="text-xs font-medium text-white/55">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-white">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
