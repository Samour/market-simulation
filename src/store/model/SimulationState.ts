export interface SimulationResult {
  uninvestedCapital: number;
  totalAmountInvested: number;
  totalAmountSpent: number;
  sharesOwned: number;
  shareValue: number;
  returnOnInvestment: number;
}

export interface SimulationState {
  simulationInProgress: boolean;
  result: SimulationResult | null;
}
