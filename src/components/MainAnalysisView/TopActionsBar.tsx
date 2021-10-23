import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { useSimulationService } from 'services/SimulationService';
import { Views } from 'store/model/NavigationState';
import { AppState } from 'store/model/AppState';
import './top-actions-bar.css';

interface State {
  simulationReady: boolean;
  simulationInProgress: boolean;
}

const selector = (state: AppState): State => ({
  simulationReady: !!state.stockDatasets.stockDatasets.length && !!state.investmentStrategy.investmentStrategy
    && !state.simulationState.simulationInProgress,
  simulationInProgress: state.simulationState.simulationInProgress,
});

const TopActionsBar = (): JSX.Element => {
  const navigationService = useNavigationService();
  const simulationService = useSimulationService();
  const { simulationReady, simulationInProgress } = useSelector(selector);

  const loadDatasetClick = () => navigationService.navigateTo(Views.DatasetSelectionView);
  const selectStrategyClick = () => navigationService.navigateTo(Views.StrategySelectionView);
  const runSimulationClick = () => simulationService.runSimulation();

  return (
    <Grid item xs={12} id='top-actions-bar'>
      <Grid container>
        <Grid item xs={false} md={2}></Grid>
        <Grid item xs={4} md={2} className='button-container'>
          <Button variant='contained' disabled={simulationInProgress} onClick={loadDatasetClick}>Load dataset</Button>
        </Grid>
        <Grid item xs={4} md={2} className='button-container'>
          <Button variant='contained' disabled={simulationInProgress} onClick={selectStrategyClick}>
            Select strategy
          </Button>
        </Grid>
        <Grid item xs={4} md={2} className='button-container'>
          <Button variant='contained' disabled={!simulationReady} onClick={runSimulationClick}>Run simulation</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopActionsBar;
