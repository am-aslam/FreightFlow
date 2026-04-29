"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ResultPanel from "@/components/ResultPanel";
import ToggleSwitch from "@/components/ToggleSwitch";
import { calculateFreight } from "@/lib/calculateFreight";
import type { FreightCalculation } from "@/types";

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

type CalculationState = {
  actualVolume: number;
  result: FreightCalculation;
};

const blockedNumberKeys = new Set(["-", "+", "e", "E"]);

export default function CalculatorForm() {
  const [calculation, setCalculation] = useState<CalculationState | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CalculatorFormInput, undefined, CalculatorFormOutput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      weight: "",
      volume: "",
      documentation: false,
    },
    mode: "onChange",
  });

  const documentationRequired = Boolean(watch("documentation"));

  const clearCalculation = useCallback(() => {
    setCalculation(null);
  }, []);

  const onSubmit = (values: CalculatorFormOutput) => {
    setCalculation({
      actualVolume: values.volume,
      result: calculateFreight(values.weight, values.volume, values.documentation),
    });
  };

  const preventInvalidNumberInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (blockedNumberKeys.has(event.key)) {
      event.preventDefault();
    }
  };

  const weightField = register("weight");
  const volumeField = register("volume");

  return (
    <section className="rounded-[20px] border border-gray-200/80 bg-white p-6 shadow-lg shadow-gray-900/10 sm:p-8">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
          Freight estimate
        </p>
        <h1 className="text-2xl font-bold tracking-normal text-gray-950 sm:text-3xl">
          Logistics freight calculator
        </h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <label htmlFor="weight" className="text-sm font-medium text-gray-800">
            Gross Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="2000"
            {...weightField}
            onKeyDown={preventInvalidNumberInput}
            onChange={(event) => {
              weightField.onChange(event);
              clearCalculation();
            }}
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
          {errors.weight?.message ? (
            <p className="text-sm font-medium text-red-600">{errors.weight.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="volume" className="text-sm font-medium text-gray-800">
            Volume (CBM)
          </label>
          <input
            id="volume"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="4"
            {...volumeField}
            onKeyDown={preventInvalidNumberInput}
            onChange={(event) => {
              volumeField.onChange(event);
              clearCalculation();
            }}
            className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
          {errors.volume?.message ? (
            <p className="text-sm font-medium text-red-600">{errors.volume.message}</p>
          ) : null}
        </div>

        <ToggleSwitch
          label="Documentation Required"
          checked={documentationRequired}
          onCheckedChange={(checked) => {
            setValue("documentation", checked, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            clearCalculation();
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Calculate Cost
        </button>
      </form>

      {calculation ? (
        <ResultPanel actualVolume={calculation.actualVolume} result={calculation.result} />
      ) : null}
    </section>
  );
}
