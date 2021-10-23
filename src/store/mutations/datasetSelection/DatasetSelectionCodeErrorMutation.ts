import { IMutation } from '../IMutation';
import { MutationType } from '../MutationType';

export interface DatasetSelectionCodeErrorMutation extends IMutation {
  type: MutationType.DATASET_SELECTION_CODE_ERROR;
  codeErrorMsg: string | null;
}

export const datasetSelectionCodeErrorMutation = (codeErrorMsg: string | null): DatasetSelectionCodeErrorMutation => ({
  type: MutationType.DATASET_SELECTION_CODE_ERROR,
  codeErrorMsg,
});
