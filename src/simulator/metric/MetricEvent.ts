import { AccountBalances } from 'simulator/models/AccountBalances';

export interface MetricEvent {
  date: Date;
  closingPrice: number;
  accountBalances: AccountBalances;
}

export const metricEvent = (date: Date, closingPrice: number, accountBalances: AccountBalances): MetricEvent => ({
  date,
  closingPrice,
  accountBalances: { ...accountBalances },
});
