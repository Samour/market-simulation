import { combineReducers } from 'redux';
import { AppState } from 'store/model/AppState';
import graphState from './graph';

export default combineReducers<AppState>({
  graphState,
});
