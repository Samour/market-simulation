import { useMemo } from 'react';
import { useStore } from 'react-redux';
import { Store } from 'redux';
import { ISimulationRunnerFactory, simulationRunnerFactory } from 'simulator/factory/SimulationRunnerFactory';
import { AppState } from 'store/model/AppState';
import { InvestmentStrategy } from 'store/model/InvestmentStrategyState';
import { simulationInProgressMutation } from 'store/mutations/simulation/SimulationInProgressMutation';
import { simulationSetResultMutation } from 'store/mutations/simulation/SimulationSetResultMutation';

export interface ISimulationService {
  runSimulation(): void;
}

class SimulationService implements ISimulationService {

  constructor(private readonly simulationRunnerFactory: ISimulationRunnerFactory,
    private readonly store: Store<AppState>) { }

  runSimulation(): void {
    this.store.dispatch(simulationInProgressMutation(true));

    const dataset = this.store.getState().stockDatasets.stockDatasets[0];
    const investmentStrategy = this.store.getState().investmentStrategy.investmentStrategy;
    const runner = this.simulationRunnerFactory.createRunner(
      {
        code: dataset.code,
        priceTimeSeries: dataset.closePrices,
      },
      investmentStrategy as InvestmentStrategy,
    );

    runner.execute();
    const {
      uninvestedCapital,
      availableCapital,
      shareExpendature,
      totalExpendature,
      sharesOwned,
    } = runner.getAccountBalances();
    const finalSharePrice = dataset.closePrices[dataset.closePrices.length - 1].price;
    const shareValue = sharesOwned * finalSharePrice;
    const returnOnInvestment = Math.round(shareValue * 100 * 100 / totalExpendature) / 100;

    this.store.dispatch(simulationInProgressMutation(false));
    this.store.dispatch(simulationSetResultMutation({
      uninvestedCapital: uninvestedCapital + availableCapital,
      totalAmountInvested: shareExpendature,
      totalAmountSpent: totalExpendature,
      sharesOwned,
      shareValue,
      returnOnInvestment,
    }));
  }
}

export const useSimulationService = (): ISimulationService => {
  const store = useStore();

  return useMemo(() =>
    new SimulationService(simulationRunnerFactory(), store),
    [store]
  );
};
