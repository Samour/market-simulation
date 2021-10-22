import { combineReducers } from 'redux';
import { AppState } from 'store/model/AppState';
import navigation from './navigation';
import graphState from './graph';
import stockDatasets from './stockDatasets';
import datasetSelection from './datasetSelection';

export default combineReducers<AppState>({
  navigation,
  graphState,
  stockDatasets,
  datasetSelection,
});
