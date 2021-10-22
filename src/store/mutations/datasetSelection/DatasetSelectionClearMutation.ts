import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface DatasetSelectionClearMutation extends IMutation {
  type: MutationType.DATASET_SELECTION_CLEAR;
}

export const datasetSelectionClearMutation = (): DatasetSelectionClearMutation => ({
  type: MutationType.DATASET_SELECTION_CLEAR,
});
