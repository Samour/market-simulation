import { AlgorithmState } from 'simulator/models/AlgorithmState';
import { InvestmentStrategy } from 'simulator/models/InvestmentStrategy';
import { StockTimeSeries } from 'simulator/models/StockTimeSeries';

export interface IAlgorithmStateFactory {
  createAlgorithmState(stockTimeSeries: StockTimeSeries, investmentStrategy: InvestmentStrategy): AlgorithmState;
}

class AlgorithmStateFactory implements IAlgorithmStateFactory {

  createAlgorithmState(stockTimeSeries: StockTimeSeries, investmentStrategy: InvestmentStrategy): AlgorithmState {
    return {
      stockTimeSeries,
      investmentStrategy,
      accountBalances: {
        uninvestedCapital: investmentStrategy.initialCapital,
        availableCapital: 0,
        sharesOwned: 0,
      },
      lastPeriodCalculation: null,
    };
  }
}

export const algorithmStateFactory = (): IAlgorithmStateFactory => new AlgorithmStateFactory();
