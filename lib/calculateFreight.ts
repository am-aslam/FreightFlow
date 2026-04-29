import type { FreightCalculation } from "@/types";

export function calculateFreight(
  weight: number,
  volume: number,
  documentation: boolean,
): FreightCalculation {
  const weightCBM = weight / 500;
  const chargeableCBM = Math.max(weightCBM, volume);
  const freightCost = chargeableCBM * 265;
  const documentationFee = documentation ? 150 : 0;
  const totalCost = freightCost + documentationFee;

  return {
    weightCBM,
    chargeableCBM,
    freightCost,
    documentationFee,
    totalCost,
  };
}
