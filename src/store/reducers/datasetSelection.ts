import { DatasetSelectionState } from 'store/model/DatasetSelectionState';
import { DatasetSelectionChangeCodeMutation } from 'store/mutations/datasetSelection/DatasetSelectionChangeCodeMutation';
import { DatasetSelectionCodeErrorMutation } from 'store/mutations/datasetSelection/DatasetSelectionCodeErrorMutation';
import { DatasetSelectionFileErrorMutation } from 'store/mutations/datasetSelection/DatasetSelectionFileErrorMutation';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';

const initialState: DatasetSelectionState = {
  fileErrorMsg: null,
  code: '',
  codeErrorMsg: null,
};

const reducer = (state: DatasetSelectionState | undefined, mutation: IMutation): DatasetSelectionState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.DATASET_SELECTION_CHANGE_CODE) {
    const { code } = mutation as DatasetSelectionChangeCodeMutation;
    return {
      ...state,
      code,
    };
  } else if (mutation.type === MutationType.DATASET_SELECTION_FILE_ERROR) {
    const { fileErrorMsg } = mutation as DatasetSelectionFileErrorMutation;
    return {
      ...state,
      fileErrorMsg,
    };
  } else if (mutation.type === MutationType.DATASET_SELECTION_CODE_ERROR) {
    const { codeErrorMsg } = mutation as DatasetSelectionCodeErrorMutation;
    return {
      ...state,
      codeErrorMsg,
    };
  } else if (mutation.type === MutationType.DATASET_SELECTION_CLEAR) {
    return initialState;
  } else {
    return state;
  }
};

export default reducer;
