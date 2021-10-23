import { InvestmentStrategy } from 'simulator/models/InvestmentStrategy';
import { StockTimeSeries } from 'simulator/models/StockTimeSeries';
import { ISimulationRunner, SimulationRunner } from 'simulator/engine/SimulationRunner';
import { IPeriodElapsedFactory, periodElapsedFactory } from './PeriodElapsedFactory';
import { CapitalManager } from 'simulator/engine/CapitalManager';
import { TradeExecutor } from 'simulator/engine/TradeExecutor';
import { algorithmStateFactory, IAlgorithmStateFactory } from './AlgorithmStateFactory';

export interface ISimulationRunnerFactory {
  createRunner(stockTimeSeries: StockTimeSeries, investmentStrategy: InvestmentStrategy): ISimulationRunner;
}

class SimulationRunnerFactory implements ISimulationRunnerFactory {

  constructor(private readonly periodElapsedFactory: IPeriodElapsedFactory,
    private readonly algorithmStateFactory: IAlgorithmStateFactory) { }

  createRunner(stockTimeSeries: StockTimeSeries, investmentStrategy: InvestmentStrategy): ISimulationRunner {
    const algorithmState = this.algorithmStateFactory.createAlgorithmState(stockTimeSeries, investmentStrategy);
    return new SimulationRunner(
      this.periodElapsedFactory.createPeriodElapsed(investmentStrategy),
      new CapitalManager(algorithmState),
      new TradeExecutor(algorithmState),
      algorithmState,
    );
  }
}

export const simulationRunnerFactory = () => new SimulationRunnerFactory(
  periodElapsedFactory(),
  algorithmStateFactory(),
);
