import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Views } from 'store/model/NavigationState';
import { datasetSelectionChangeCodeMutation } from 'store/mutations/datasetSelection/DatasetSelectionChangeCodeMutation';
import { datasetSelectionClearMutation } from 'store/mutations/datasetSelection/DatasetSelectionClearMutation';
import { datasetSelectionCodeErrorMutation } from 'store/mutations/datasetSelection/DatasetSelectionCodeErrorMutation';
import { datasetSelectionFileErrorMutation } from 'store/mutations/datasetSelection/DatasetSelectionFileErrorMutation';
import { IMutation } from 'store/mutations/IMutation';
import { IDatasetLoadService, useDatasetLoadService } from './DatasetLoadService';
import { defaultErrorHandler } from './defaultErrorHandler';
import { INavigationService, useNavigationService } from './NavigationService';

const MAX_CODE_LENGTH = 5;

export interface IDatasetSelectionService {
  setCode(code: string): void;

  clearFileErrorMsg(): void;

  cancelSelection(): void;

  validateAndLoadFile(code: string, file: File | null): void;
}

class DatasetSelectionService implements IDatasetSelectionService {

  constructor(private readonly datasetLoadService: IDatasetLoadService,
    private readonly navigationService: INavigationService, private readonly dispatch: Dispatch) { }

  setCode(code: string): void {
    this.dispatch(datasetSelectionChangeCodeMutation(code));
    this.dispatch(datasetSelectionCodeErrorMutation(null));
  }

  clearFileErrorMsg(): void {
    this.dispatch(datasetSelectionFileErrorMutation(null));
  }

  cancelSelection(): void {
    this.dispatch(datasetSelectionClearMutation());
    this.navigationService.navigateTo(Views.MainAnalysisView);
  }

  validateAndLoadFile(code: string, file: File | null): void {
    const errorMutations: IMutation[] = [];

    if (!code.length) {
      errorMutations.push(datasetSelectionCodeErrorMutation('Stock code must be specified'));
    } else if (code.length > MAX_CODE_LENGTH) {
      errorMutations.push(datasetSelectionCodeErrorMutation(`Stock code should not exceed ${MAX_CODE_LENGTH} characters`));
    }

    if (!file) {
      errorMutations.push(datasetSelectionFileErrorMutation('File must be selected'));
    }

    if (errorMutations.length) {
      errorMutations.forEach((m) => this.dispatch(m));
      return;
    }

    this.datasetLoadService.loadDatasetFile(code, file as File)
      .then((success) => {
        if (success) {
          this.cancelSelection();
        }
      }).catch(defaultErrorHandler());
  }
}

export const useDatasetSelectionService = (): IDatasetSelectionService => {
  const datasetLoadService = useDatasetLoadService();
  const navigationService = useNavigationService();
  const dispatch = useDispatch();

  return useMemo(() =>
    new DatasetSelectionService(
      datasetLoadService,
      navigationService,
      dispatch
    ),
    [datasetLoadService, navigationService, dispatch]
  );
};
