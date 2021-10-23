import { AccountBalances } from 'simulator/models/AccountBalances';
import { AlgorithmState } from 'simulator/models/AlgorithmState';
import { ICapitalManager } from './CapitalManager';
import { IPeriodElapsed } from './PeriodElapsed';
import { ITradeExecutor } from './TradeExecutor';

export interface ISimulationRunner {
  execute(): void;

  getAccountBalances(): AccountBalances;
}

export class SimulationRunner implements ISimulationRunner {

  constructor(private readonly periodElapsed: IPeriodElapsed,
    private readonly capitalManager: ICapitalManager,
    private readonly tradeExecutor: ITradeExecutor,
    private readonly algorithmState: AlgorithmState) { }

    execute(): void {
      for (let day of this.algorithmState.stockTimeSeries.priceTimeSeries) {
        if (this.periodElapsed.hasPeriodElapsed(day.date)) {
          this.capitalManager.updatePeriodicCapital();
          this.tradeExecutor.executeTrade(day);
        }
      }
    }

    getAccountBalances(): AccountBalances {
      return this.algorithmState.accountBalances;
    }
}
