import type { CurrencyCode } from "@/types";

const AED_PER_USD = 3.6725;

export const currencyOptions: Array<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD" },
  { code: "AED", label: "AED" },
];

export function convertFromUsd(amount: number, currency: CurrencyCode) {
  return currency === "AED" ? amount * AED_PER_USD : amount;
}

export function formatCurrency(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(convertFromUsd(amount, currency));
}

export function formatCBM(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
