import { StockDatasetState } from 'store/model/StockDatasetsState';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';
import { StockDatasetsAddMutation } from 'store/mutations/stockDatasets/StockDatasetsAddMutation';

const initialState: StockDatasetState = {
  stockDatasets: [],
};

const reducer = (state: StockDatasetState | undefined, mutation: IMutation): StockDatasetState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.STOCK_DATASETS_ADD) {
    const { dataset } = mutation as StockDatasetsAddMutation;
    return {
      ...state,
      stockDatasets: [
        ...state.stockDatasets.filter((d) => d.code !== dataset.code),
        dataset,
      ],
    };
  } else if (mutation.type === MutationType.STOCK_DATASETS_REMOVE_ALL) {
    return {
      ...state,
      stockDatasets: [],
    };
  } else {
    return state;
  }
};

export default reducer;
