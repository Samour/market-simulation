import { DatasetSelectionState } from 'store/model/DatasetSelectionState';
import { DatasetSelectionChangeCodeMutation } from 'store/mutations/datasetSelection/DatasetSelectionChangeCodeMutation';
import { IMutation } from 'store/mutations/IMutation';
import { MutationType } from 'store/mutations/MutationType';

const initialState: DatasetSelectionState = {
  code: '',
};

const reducer = (state: DatasetSelectionState | undefined, mutation: IMutation): DatasetSelectionState => {
  state = state ?? initialState;

  if (mutation.type === MutationType.DATASET_SELECTION_CHANGE_CODE) {
    const { code } = mutation as DatasetSelectionChangeCodeMutation;
    return {
      ...state,
      code,
    };
  } else if (mutation.type === MutationType.DATASET_SELECTION_CLEAR) {
    return initialState;
  } else {
    return state;
  }
};

export default reducer;
