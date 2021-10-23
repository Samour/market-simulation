import React from 'react';
import GraphContainer from 'components/GraphContainer';
import TopActionsBar from './TopActionsBar';
import ShowInvestmentStrategy from './ShowInvestmentStrategy';

const MainAnalysisView = (): JSX.Element => {
  return (
    <div>
      <TopActionsBar />
      <ShowInvestmentStrategy />
      <GraphContainer />
    </div>
  );
};

export default MainAnalysisView;
