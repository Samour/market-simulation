import { DatasetSelectionState } from './DatasetSelectionState';
import { GraphState } from './GraphState';
import { NavigationState } from './NavigationState';
import { StockDatasetState } from './StockDatasetsState';

export interface AppState {
  navigation: NavigationState;
  graphState: GraphState;
  stockDatasets: StockDatasetState;
  datasetSelection: DatasetSelectionState;
}
