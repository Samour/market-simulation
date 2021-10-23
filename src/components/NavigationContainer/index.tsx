import React from 'react';
import { useSelector } from 'react-redux';
import DatasetSelectionView from 'components/DatasetSelectionView';
import MainAnalysisView from 'components/MainAnalysisView';
import { AppState } from 'store/model/AppState';
import { Views } from 'store/model/NavigationState';
import StrategySelectionView from 'components/StrategySelectionView';
import SimulationSettingsView from 'components/SimulationSettingsView';

const selector = (state: AppState): Views => state.navigation.location;

const NavigationContainer = (): JSX.Element => {
  const location = useSelector(selector);

  if (location === Views.DatasetSelectionView) {
    return <DatasetSelectionView />;
  } else if (location === Views.StrategySelectionView) {
    return <StrategySelectionView />;
  } else if (location === Views.SimulationSettingsView) {
    return <SimulationSettingsView />
  } else {
    return <MainAnalysisView />;
  }
};

export default NavigationContainer;
