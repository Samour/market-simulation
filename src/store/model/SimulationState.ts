export interface SimulationResult {
  uninvestedCapital: number;
  sharesOwned: number;
  shareValue: number;
}

export interface SimulationState {
  simulationInProgress: boolean;
  result: SimulationResult | null;
}
