import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import GraphContainer from 'components/GraphContainer';

function App() {
  return (
    <Provider store={store}>
      <GraphContainer />
    </Provider>
  );
}

export default App;
