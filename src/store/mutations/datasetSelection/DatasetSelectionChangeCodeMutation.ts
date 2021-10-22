import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface DatasetSelectionChangeCodeMutation extends IMutation {
  type: MutationType.DATASET_SELECTION_CHANGE_CODE;
  code: string;
}

export const datasetSelectionChangeCodeMutation = (code: string): DatasetSelectionChangeCodeMutation => ({
  type: MutationType.DATASET_SELECTION_CHANGE_CODE,
  code,
});
