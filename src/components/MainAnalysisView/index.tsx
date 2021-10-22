import React from 'react';
import GraphContainer from 'components/GraphContainer';
import TopActionsBar from './TopActionsBar';

const MainAnalysisView = (): JSX.Element => {
  return (
    <div>
      <TopActionsBar />
      <GraphContainer />
    </div>
  );
};

export default MainAnalysisView;
