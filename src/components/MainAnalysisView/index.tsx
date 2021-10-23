import React from 'react';
import { Grid } from '@mui/material';
import GraphContainer from 'components/GraphContainer';
import TopActionsBar from './TopActionsBar';
import ShowInvestmentStrategy from './ShowInvestmentStrategy';
import ShowSimulationResult from './ShowSimulationResult';

const MainAnalysisView = (): JSX.Element => {
  return (
    <Grid container>
      <TopActionsBar />
      <ShowInvestmentStrategy />
      <ShowSimulationResult />
      <GraphContainer />
    </Grid>
  );
};

export default MainAnalysisView;
