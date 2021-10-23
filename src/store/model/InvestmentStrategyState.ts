import { AdditionalCapitalFrequency } from 'simulator/models/InvestmentStrategy';

export interface InvestmentStrategy {
  initialCapital: number;
  periodicAdditionalCapital: number;
  additionalCapitalFrequency: AdditionalCapitalFrequency;
  perTradeCost: number;
}

export interface InvestementStrategyState {
  investmentStrategy: InvestmentStrategy | null;
}
