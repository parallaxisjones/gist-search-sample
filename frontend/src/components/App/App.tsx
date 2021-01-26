import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav, Body } from '..';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const uri = 'http://localhost:3000/graphql';
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Nav />
        <Body />
      </div>
    </ApolloProvider>
  );
}

export default App;
