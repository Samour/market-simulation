import { AccountBalances } from './AccountBalances';
import { InvestmentStrategy } from './InvestmentStrategy';
import { StockTimeSeries } from './StockTimeSeries';

export interface AlgorithmState {
  stockTimeSeries: StockTimeSeries;
  investmentStrategy: InvestmentStrategy;
  accountBalances: AccountBalances;
  lastTradeDate: Date | null;
}
