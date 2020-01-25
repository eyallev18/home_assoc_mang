import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TanantsPage from './pages/TanantsPage';
import MessagesPage from './pages/MessagesPage';
import IssuesPage from './pages/IssuesPage';
import VotingPage from './pages/VotingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>
        <Route exact path="/tanants">
          <TanantsPage />
        </Route>
        <Route exact path="/messages">
          <MessagesPage />
        </Route>
        <Route exact path="/issues">
          <IssuesPage />
        </Route>
        <Route exact path="/voting">
          <VotingPage />
        </Route>


      </Switch>

    );
  }
}

export default App;
