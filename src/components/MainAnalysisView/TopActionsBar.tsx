import React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigationService } from 'services/NavigationService';
import { Views } from 'store/model/NavigationState';
import { AppState } from 'store/model/AppState';
import { useSelector } from 'react-redux';
import './top-actions-bar.css';

interface State {
  simulationReady: boolean;
}

const selector = (state: AppState): State => ({
  simulationReady: !!state.stockDatasets.stockDatasets.length && !!state.investmentStrategy.investmentStrategy,
});

const TopActionsBar = (): JSX.Element => {
  const navigationService = useNavigationService();
  const { simulationReady } = useSelector(selector);

  const loadDatasetClick = () => navigationService.navigateTo(Views.DatasetSelectionView);
  const selectStrategyClick = () => navigationService.navigateTo(Views.StrategySelectionView);

  return (
    <Grid container id='top-actions-bar'>
      <Grid item xs={false} md={2}></Grid>
      <Grid item xs={4} md={2} className='button-container'>
        <Button variant='contained' onClick={loadDatasetClick}>Load dataset</Button>
      </Grid>
      <Grid item xs={4} md={2} className='button-container'>
        <Button variant='contained' onClick={selectStrategyClick}>Select strategy</Button>
      </Grid>
      <Grid item xs={4} md={2} className='button-container'>
        <Button variant='contained' disabled={!simulationReady}>Run simulation</Button>
      </Grid>
    </Grid>
  );
};

export default TopActionsBar;
