import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import { Nav, Body, GistList, GistViewer, Favorites as FavoriteGists } from '..';
import { BrowserRouter as Router, Route } from "react-router-dom";
import client from '../../apollo/client';

function App() {

  const HomeScreen = () => {
    return (<GistList username="parallaxisjones" />);
  }
  
  const Favorites = () => {
    return (<FavoriteGists />);
  }
  
  const GistView = ({ match }: any) => {
    return (<GistViewer gistId={match.params.id} />);
  }
  

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Nav />
          <Body>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/gist/:id" component={GistView} />
          </Body>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
