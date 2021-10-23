import { AlgorithmState } from 'simulator/models/AlgorithmState';

export interface ICapitalManager {
  updatePeriodicCapital(): void;
}

export class CapitalManager implements ICapitalManager {

  constructor(private readonly algorithmState: AlgorithmState) { }

  updatePeriodicCapital(): void {
    this.algorithmState.accountBalances.uninvestedCapital += this.algorithmState.investmentStrategy
      .periodicAdditionalCapital;
  }
}
