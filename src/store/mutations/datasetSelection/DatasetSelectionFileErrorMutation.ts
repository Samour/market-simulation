import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface DatasetSelectionFileErrorMutation extends IMutation {
  type: MutationType.DATASET_SELECTION_FILE_ERROR;
  fileErrorMsg: string | null;
}

export const datasetSelectionFileErrorMutation = (fileErrorMsg: string | null): DatasetSelectionFileErrorMutation => ({
  type: MutationType.DATASET_SELECTION_FILE_ERROR,
  fileErrorMsg,
});
