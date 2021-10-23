export enum InvestmentFrequency {
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
  investmentFrequency: InvestmentFrequency;
  maxInvestmentPerTrade: number;
  perTradeCost: number;
}
