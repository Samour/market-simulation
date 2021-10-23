import { combineReducers } from 'redux';
import { AppState } from 'store/model/AppState';
import navigation from './navigation';
import graphState from './graph';
import stockDatasets from './stockDatasets';
import investmentStrategy from './investmentStrategy';
import simulationState from './simulationState';

export default combineReducers<AppState>({
  navigation,
  graphState,
  stockDatasets,
  investmentStrategy,
  simulationState,
});
