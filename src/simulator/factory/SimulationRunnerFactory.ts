import { InvestmentStrategy } from 'simulator/models/InvestmentStrategy';
import { StockTimeSeries } from 'simulator/models/StockTimeSeries';
import { ISimulationRunner } from 'simulator/engine/SimulationRunner';

export interface ISimulationRunnerFactory {
  createRunner(stockTimeSeries: StockTimeSeries, investmentStrategy: InvestmentStrategy): ISimulationRunner;
}
