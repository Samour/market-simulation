import React from 'react';
import { Chart } from 'react-charts';
import { useSelector } from 'react-redux';
import { AppState } from 'store/model/AppState';
import { GraphState } from 'store/model/GraphState';
import './index.css';

const selector = (state: AppState): GraphState => state.graphState;

const GraphContainer = (): JSX.Element => {
  const { data, axes } = useSelector(selector);

  if (!data.length || axes.length < 2) {
    return <div id='graph-container' className='no-data'>No data</div>;
  }

  return (
    <div id='graph-container'>
      <div className='graph-container-inner'>
        <Chart data={data} axes={axes} tooltip />
      </div>
    </div>
  );
};

export default GraphContainer;
