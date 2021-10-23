import { GraphState } from './GraphState';
import { InvestementStrategyState } from './InvestmentStrategyState';
import { NavigationState } from './NavigationState';
import { StockDatasetState } from './StockDatasetsState';

export interface AppState {
  navigation: NavigationState;
  graphState: GraphState;
  stockDatasets: StockDatasetState;
  investmentStrategy: InvestementStrategyState;
}
