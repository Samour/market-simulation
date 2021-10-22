import { StockDatasetState } from 'store/model/StockDatasetsState';
import { IMutation } from 'store/mutations/IMutation';

const initialState: StockDatasetState = {
  stockDatasets: [],
};

const reducer = (state: StockDatasetState | undefined, mutation: IMutation): StockDatasetState => {
  return state ?? initialState;
};

export default reducer;
