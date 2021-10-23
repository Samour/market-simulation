import React from 'react';
import { Grid } from '@mui/material';
import GraphContainer from 'components/GraphContainer';
import TopActionsBar from './TopActionsBar';
import ShowInvestmentStrategy from './ShowInvestmentStrategy';
import ShowSimulationResult from './ShowSimulationResult';

const MainAnalysisView = (): JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TopActionsBar />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowInvestmentStrategy />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowSimulationResult />
      </Grid>
      <GraphContainer />
    </Grid>
  );
};

export default MainAnalysisView;
