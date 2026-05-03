"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, BadgeDollarSign, FileText, RefreshCcw, Route, Scale } from "lucide-react";
import ResultPanel from "@/components/ResultPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { currencyOptions } from "@/lib/currency";
import { calculateFreight } from "@/lib/calculateFreight";
import type { CurrencyCode, FreightCalculation, SavedCalculation } from "@/types";

const STORAGE_KEY = "freightflow-last-calculation";

const positiveNumberString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .regex(/^\d+(\.\d+)?$/, `${label} must be a positive number`)
    .transform(Number)
    .refine((value) => value > 0, `${label} must be greater than 0`);

const calculatorSchema = z.object({
  weight: positiveNumberString("Gross weight"),
  volume: positiveNumberString("Volume"),
  documentation: z.boolean(),
});

type CalculatorFormInput = z.input<typeof calculatorSchema>;
type CalculatorFormOutput = z.output<typeof calculatorSchema>;

const blockedNumberKeys = new Set(["-", "+", "e", "E"]);

function ErrorMessage({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-semibold text-red-600 dark:text-red-400">{message}</p>;
}

export default function CalculatorForm() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [calculation, setCalculation] = useState<FreightCalculation | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CalculatorFormInput, undefined, CalculatorFormOutput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      weight: "",
      volume: "",
      documentation: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as SavedCalculation;
      setValue("weight", parsed.weight, { shouldDirty: true, shouldValidate: true });
      setValue("volume", parsed.volume, { shouldDirty: true, shouldValidate: true });
      setValue("documentation", parsed.documentation, { shouldDirty: true, shouldValidate: true });
      setCurrency(parsed.currency ?? "USD");
      setCalculation(parsed.result);
      void trigger();
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [setValue, trigger]);

  const persistCalculation = useCallback(
    (result: FreightCalculation, nextCurrency = currency) => {
      const values = getValues();

      const payload: SavedCalculation = {
        weight: values.weight,
        volume: values.volume,
        documentation: values.documentation,
        currency: nextCurrency,
        result,
        savedAt: new Date().toISOString(),
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [currency, getValues],
  );

  const clearCalculation = useCallback(() => {
    setCalculation(null);
  }, []);

  const onSubmit = (values: CalculatorFormOutput) => {
    const result = calculateFreight(values.weight, values.volume, values.documentation);
    setCalculation(result);
    persistCalculation(result);
  };

  const handleCurrencyChange = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency);

    if (calculation) {
      persistCalculation(calculation, nextCurrency);
    }
  };

  const handleReset = () => {
    reset({
      weight: "",
      volume: "",
      documentation: false,
    });
    setCurrency("USD");
    setCalculation(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const preventInvalidNumberInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (blockedNumberKeys.has(event.key)) {
      event.preventDefault();
    }
  };

  const weightField = register("weight");
  const volumeField = register("volume");

  return (
    <section id="calculator" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <Badge tone="teal">
            <BadgeDollarSign className="size-3.5" />
            Instant quote engine
          </Badge>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-[#0B1F3A] dark:text-white sm:text-4xl">
            Calculate chargeable freight in seconds
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
            Built for Guangzhou to Jebel Ali shipments with transparent CBM logic and optional local documentation.
          </p>
        </div>

        <div className="flex w-full rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5 sm:w-auto">
          {currencyOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => handleCurrencyChange(option.code)}
              className={[
                "h-10 flex-1 rounded-full px-5 text-sm font-bold transition sm:flex-none",
                currency === option.code
                  ? "bg-[#0B1F3A] text-white shadow-sm dark:bg-white dark:text-[#0B1F3A]"
                  : "text-slate-500 hover:text-[#0B1F3A] dark:text-slate-300 dark:hover:text-white",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <Card className="border-white/70 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <CardHeader>
            <div className="mb-2 flex items-center justify-between gap-4">
              <Badge tone="orange">
                <Route className="size-3.5" />
                Guangzhou → Jebel Ali
              </Badge>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                $265 / CBM
              </span>
            </div>
            <CardTitle>Freight Cost Calculator</CardTitle>
            <CardDescription>
              Enter shipment dimensions to estimate your freight rate with documentation charges when required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="size-4 text-[#13B8A6]" />
                  Gross Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Example: 2000"
                  {...weightField}
                  onKeyDown={preventInvalidNumberInput}
                  onChange={(event) => {
                    weightField.onChange(event);
                    clearCalculation();
                  }}
                />
                <ErrorMessage message={errors.weight?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume" className="flex items-center gap-2">
                  <Route className="size-4 text-[#13B8A6]" />
                  Volume (CBM)
                </Label>
                <Input
                  id="volume"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Example: 4"
                  {...volumeField}
                  onKeyDown={preventInvalidNumberInput}
                  onChange={(event) => {
                    volumeField.onChange(event);
                    clearCalculation();
                  }}
                />
                <ErrorMessage message={errors.volume?.message} />
              </div>

              <Controller
                control={control}
                name="documentation"
                render={({ field }) => (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0B1F3A] shadow-sm dark:bg-slate-950 dark:text-white">
                        <FileText className="size-4" />
                      </span>
                      <div>
                        <Label htmlFor="documentation">Local Documentation Required</Label>
                        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                          Adds a fixed $150 processing fee.
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="documentation"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        clearCalculation();
                      }}
                    />
                  </div>
                )}
              />

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <Button
                  type="submit"
                  size="lg"
                  variant="teal"
                  disabled={!isValid || isSubmitting}
                  className="w-full"
                >
                  Calculate Cost
                  <ArrowRight />
                </Button>
                <Button type="button" size="lg" variant="outline" onClick={handleReset}>
                  <RefreshCcw />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <ResultPanel currency={currency} result={calculation} />
      </div>
    </section>
  );
}
