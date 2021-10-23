import { StockDataset } from 'store/model/StockDatasetsState';
import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface StockDatasetsAddMutation extends IMutation {
  type: MutationType.STOCK_DATASETS_ADD;
  dataset: StockDataset;
}

export const stockDatasetsAddMutation = (dataset: StockDataset): StockDatasetsAddMutation => ({
  type: MutationType.STOCK_DATASETS_ADD,
  dataset,
});
