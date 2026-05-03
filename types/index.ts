export type FreightCalculation = {
  actualCBM: number;
  weightCBM: number;
  chargeableCBM: number;
  freightCost: number;
  documentationFee: number;
  totalCost: number;
};

export type CurrencyCode = "USD" | "AED";

export type SavedCalculation = {
  weight: string;
  volume: string;
  documentation: boolean;
  currency: CurrencyCode;
  result: FreightCalculation;
  savedAt: string;
};
