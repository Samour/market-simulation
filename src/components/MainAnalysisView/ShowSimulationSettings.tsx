import React from 'react';
import { Grid } from '@mui/material';
import { AppState } from 'store/model/AppState';
import { SimulationSettings } from 'store/model/SimulationState';
import { useSelector } from 'react-redux';

const selector = (state: AppState): SimulationSettings | null => state.simulationState.simulationSettings;

const formatDate = (date: Date): string => new Intl.DateTimeFormat().format(date);

const ShowSimulationSettings = (): JSX.Element => {
  const simulationSettings = useSelector(selector);

  if (!simulationSettings) {
    return <></>;
  }

  const { startDate, endDate } = simulationSettings;

  return (
    <Grid container className='stats-container'>
      <Grid item xs={6}>
        Start date:
      </Grid>
      <Grid item xs={6}>
        {formatDate(startDate)}
      </Grid>
      <Grid item xs={6}>
        End date:
      </Grid>
      <Grid item xs={6}>
        {formatDate(endDate)}
      </Grid>
    </Grid>
  );
};

export default ShowSimulationSettings;
