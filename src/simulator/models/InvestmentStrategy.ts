export enum AdditionalCapitalFrequency {
  DAILY = 'Daily',
  WEEKLY = 'WEEKLY',
  FORTNIGHTLY = 'FORTNIGHTLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export interface InvestmentStrategy {
  initialCapital: number;
  periodicAdditionalCapital: number;
  additionalCapitalFrequency: AdditionalCapitalFrequency;
  perTradeCost: number;
}
