import { useMemo } from 'react';
import { useStore } from 'react-redux';
import { Store } from 'redux';
import { ISimulationRunnerFactory, simulationRunnerFactory } from 'simulator/factory/SimulationRunnerFactory';
import { AppState } from 'store/model/AppState';
import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { SimulationSettings } from 'store/model/SimulationState';
import { simulationInProgressMutation } from 'store/mutations/simulation/SimulationInProgressMutation';
import { IGraphService, useGraphService } from './GraphService';
import { SimulationAnalyser } from './SimulationAnalyser';

export interface ISimulationService {
  runSimulation(): void;
}

class SimulationService implements ISimulationService {

  constructor(
    private readonly graphService: IGraphService,
    private readonly simulationRunnerFactory: ISimulationRunnerFactory,
    private readonly store: Store<AppState>,
  ) { }

  runSimulation(): void {
    this.store.dispatch(simulationInProgressMutation(true));

    const { startDate, endDate } = this.store.getState().simulationState.simulationSettings as SimulationSettings;
    const dataset = this.store.getState().stockDatasets.stockDatasets[0];
    const priceTimeSeries = dataset.closePrices
      .filter(({ date }) => date >= startDate && date <= endDate);
    const investmentStrategy = this.store.getState().investmentStrategy.investmentStrategy;
    const runner = this.simulationRunnerFactory.createRunner(
      {
        code: dataset.code,
        priceTimeSeries,
      },
      investmentStrategy as InvestmentStrategy,
    );

    const simulationAnalyser = new SimulationAnalyser(this.graphService, this.store.dispatch, priceTimeSeries);
    runner.setMetricListener((m) => simulationAnalyser.receiveMetric(m));
    runner.execute();
    simulationAnalyser.publishMetrics(runner.getAccountBalances());

    this.store.dispatch(simulationInProgressMutation(false));
  }
}

export const useSimulationService = (): ISimulationService => {
  const graphService = useGraphService();
  const store = useStore();

  return useMemo(() =>
    new SimulationService(graphService, simulationRunnerFactory(), store),
    [graphService, store]
  );
};
