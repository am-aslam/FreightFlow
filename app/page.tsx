import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Ship, Truck } from "lucide-react";
import CalculatorForm from "@/components/CalculatorForm";
import Header from "@/components/Header";
import HeroVisual from "@/components/HeroVisual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trustPoints = [
  "Global reach with local expertise",
  "Compliance-driven operations",
  "On-time, on-budget delivery",
];

const serviceCards = [
  {
    icon: Ship,
    title: "Sea Freight",
    copy: "Transparent LCL and FCL pricing from China into Jebel Ali.",
  },
  {
    icon: Truck,
    title: "Local Handling",
    copy: "Documentation and destination support reflected in the final quote.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Compliance",
    copy: "Chargeable CBM logic keeps estimates auditable and easy to approve.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-950 dark:bg-[#07111f] dark:text-white">
      <Header />

      <section className="relative overflow-hidden bg-[#0B1F3A] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F6F8FB] to-transparent dark:from-[#07111f]" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Badge className="border-white/10 bg-white/10 text-white">
              <Globe2 className="size-3.5 text-[#13B8A6]" />
              Guangzhou → Jebel Ali
            </Badge>

            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl lg:text-6xl">
              Freight Cost Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Instantly estimate your shipping costs with precision
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Built for teams that need fast, reliable freight visibility before confirming cargo movement across global lanes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <a href="#calculator">
                  Calculate Now
                  <ArrowRight />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/15 bg-white/10 text-white hover:bg-white/15" asChild>
                <a href="#breakdown">View breakdown</a>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur">
                  <CheckCircle2 className="size-5 shrink-0 text-[#13B8A6]" />
                  <span className="text-sm font-semibold text-slate-200">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pt-12 sm:px-6 md:grid-cols-3">
        {serviceCards.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0B1F3A] text-white">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-5 text-lg font-black tracking-normal text-[#0B1F3A] dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.copy}</p>
            </article>
          );
        })}
      </section>

      <CalculatorForm />

      <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#081421]">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-base font-black text-[#0B1F3A] dark:text-white">FreightFlow</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your trusted logistics estimator, moving forward every day.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500 dark:text-slate-300">
            <a className="hover:text-[#0B1F3A] dark:hover:text-white" href="#calculator">
              Get Quote
            </a>
            <a className="hover:text-[#0B1F3A] dark:hover:text-white" href="#breakdown">
              Cost Breakdown
            </a>
            <a className="hover:text-[#0B1F3A] dark:hover:text-white" href="/">
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
