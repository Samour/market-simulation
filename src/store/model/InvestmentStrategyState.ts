import { InvestmentFrequency } from 'simulator/models/InvestmentStrategy';

export interface InvestmentStrategy {
  initialCapital: number;
  periodicAdditionalCapital: number;
  investmentFrequency: InvestmentFrequency;
  maxInvestmentPerTrade: number;
  perTradeCost: number;
}

export interface InvestementStrategyState {
  investmentStrategy: InvestmentStrategy | null;
}
