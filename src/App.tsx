import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import NavigationContainer from 'components/NavigationContainer';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

export default App;
