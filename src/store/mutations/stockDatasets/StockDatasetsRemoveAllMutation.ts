import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface StockDatasetsRemoveAllMutation extends IMutation {
  type: MutationType.STOCK_DATASETS_REMOVE_ALL;
}

export const stockDatasetsRemoveAllMutation = (): StockDatasetsRemoveAllMutation => ({
  type: MutationType.STOCK_DATASETS_REMOVE_ALL,
});
