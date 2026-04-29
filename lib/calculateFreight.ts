import type { FreightCalculation } from "@/types";

const CBM_WEIGHT_DIVISOR = 500;
const FREIGHT_RATE_PER_CBM = 265;
const DOCUMENTATION_FEE = 150;

export function calculateFreight(
  weight: number,
  volume: number,
  documentation: boolean,
): FreightCalculation {
  const actualCBM = volume;
  const weightCBM = weight / CBM_WEIGHT_DIVISOR;
  const chargeableCBM = Math.max(weightCBM, actualCBM);
  const freightCost = chargeableCBM * FREIGHT_RATE_PER_CBM;
  const documentationFee = documentation ? DOCUMENTATION_FEE : 0;
  const totalCost = freightCost + documentationFee;

  return {
    actualCBM,
    weightCBM,
    chargeableCBM,
    freightCost,
    documentationFee,
    totalCost,
  };
}
