import { useState } from 'react'
import { useDatasetLoadService } from 'services/DatasetLoadService';
import { defaultErrorHandler } from 'services/defaultErrorHandler';
import { useNavigationService } from 'services/NavigationService';
import { Views } from 'store/model/NavigationState';

const MAX_CODE_LENGTH = 5;

export const useDatasetSelectionForm = () => {
  const navigationService = useNavigationService();
  const datasetLoadService = useDatasetLoadService();
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState<string>('');
  const [fileErrorMsg, setFileErrorMsg] = useState<string | null>(null);
  const [codeErrorMsg, setCodeErrorMsg] = useState<string | null>(null);
  const [fileIsLoading, setFileIsLoading] = useState<boolean>(false);

  const onCancelClick = () => navigationService.navigateTo(Views.MainAnalysisView);
  const onConfirmClick = async () => {
    let hasError = false;

    if (!file) {
      setFileErrorMsg('File must be selected');
      hasError = true;
    }
    
    if (!code.length) {
      setCodeErrorMsg('Stock code must be specified');
      hasError = true;
    } else if (code.length > MAX_CODE_LENGTH) {
      setCodeErrorMsg(`Stock code should not exceed ${MAX_CODE_LENGTH} characters`);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setFileIsLoading(true);
    const error = await datasetLoadService.loadDatasetFile(code, file as File);
    setFileIsLoading(false);
    if (error) {
      setFileErrorMsg(error);
    } else {
      navigationService.navigateTo(Views.MainAnalysisView);
    }
  };

  return {
    code,
    fileErrorMsg,
    codeErrorMsg,
    fileIsLoading,
    setCode: (value: string) => {
      setCode(value);
      setCodeErrorMsg(null);
    },
    setFile: (value: File | null) => {
      setFile(value);
      setFileErrorMsg(null);
    },
    onCancelClick,
    onConfirmClick: () => onConfirmClick().catch(defaultErrorHandler()),
  };
};
