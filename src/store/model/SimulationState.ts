export interface SimulationSettings {
  startDate: Date;
  endDate: Date;
}

export interface SimulationResult {
  uninvestedCapital: number;
  totalAmountInvested: number;
  totalAmountSpent: number;
  sharesOwned: number;
  shareValue: number;
  returnOnInvestment: number;
}

export interface SimulationState {
  simulationSettings: SimulationSettings | null;
  simulationInProgress: boolean;
  result: SimulationResult | null;
}
