import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { datasetSelectionChangeCodeMutation } from 'store/mutations/datasetSelection/DatasetSelectionChangeCodeMutation';
import { datasetSelectionClearMutation } from 'store/mutations/datasetSelection/DatasetSelectionClearMutation';

export interface IDatasetSelectionService {
  setCode(code: string): void;

  clearForm(): void;
}

class DatasetSelectionService implements IDatasetSelectionService {

  constructor(private readonly dispatch: Dispatch) { }

  setCode(code: string): void {
    this.dispatch(datasetSelectionChangeCodeMutation(code));
  }

  clearForm(): void {
    this.dispatch(datasetSelectionClearMutation());
  }
}

export const useDatasetSelectionService = (): IDatasetSelectionService => {
  const dispatch = useDispatch();

  return useMemo(() =>
    new DatasetSelectionService(dispatch),
    [dispatch]
  );
};
