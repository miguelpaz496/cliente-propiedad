import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import reducers from './Reducers'
import { Provider } from 'react-redux';

const store = createStore(
  reducers, 
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

ReactDOM.render(<ApolloProvider client={client} >
  <Provider store={store}>
    <App  />
  </Provider>
</ApolloProvider>, document.getElementById('root'));
