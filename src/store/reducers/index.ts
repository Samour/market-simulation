import { combineReducers } from 'redux';
import { AppState } from 'store/model/AppState';
import navigation from './navigation';
import graphState from './graph';
import stockDatasets from './stockDatasets';
import datasetSelection from './datasetSelection';
import investmentStrategy from './investmentStrategy';

export default combineReducers<AppState>({
  navigation,
  graphState,
  stockDatasets,
  datasetSelection,
  investmentStrategy,
});
