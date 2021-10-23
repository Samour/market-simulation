import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import { AppState } from 'store/model/AppState';
import { SimulationState } from 'store/model/SimulationState';
import './show-simulation-result.css';

const selector = (state: AppState): SimulationState => state.simulationState;

const toDollars = (value: number): string => `$${Math.round(value / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const ShowSimulationResult = (): JSX.Element => {
  const { simulationInProgress, result } = useSelector(selector);

  if (simulationInProgress) {
    return (
      <Grid item xs={12} sm={6} id='show-simulation-result' className='simulation-in-progress'>
        <CircularProgress />
      </Grid>
    );
  }

  if (!result) {
    return <></>;
  }

  return (
    <Grid item xs={12} sm={6} id='show-simulation-result'>
      <Grid container>
        <Grid item xs={6}>
          Uninvested capital:
        </Grid>
        <Grid item xs={6}>
          {toDollars(result.uninvestedCapital)}
        </Grid>
        <Grid item xs={6}>
          Shares owned:
        </Grid>
        <Grid item xs={6}>
          {result.sharesOwned}
        </Grid>
        <Grid item xs={6}>
          Share value:
        </Grid>
        <Grid item xs={6}>
          {toDollars(result.shareValue)}
        </Grid>
      </Grid>
    </Grid>
  )
};

export default ShowSimulationResult;
