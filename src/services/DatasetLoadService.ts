import { defaultErrorHandler } from './defaultErrorHandler';

export interface IDatasetLoadService {
  loadDatasetFile(file: File): void;
}

class DatasetLoadService implements IDatasetLoadService {

  loadDatasetFile(file: File): void {
    
  }
}
