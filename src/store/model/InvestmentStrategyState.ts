export enum AdditionalCapitalFrequency {
  DAILY = 'Daily',
  WEEKLY = 'WEEKLY',
  FORTNIGHTLY = 'FORTNIGHTLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export interface InvestmentStrategy {
  initialCapital: number;
  periodicAdditionalCapital: number;
  additionalCapitalFrequency: AdditionalCapitalFrequency;
  perTradeCost: number;
}

export interface InvestementStrategyState {
  investmentStrategy: InvestmentStrategy | null;
}
