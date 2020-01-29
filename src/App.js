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
import Parse from 'parse'

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeUser: null,
      committeeUser: null
    }
    //this.handeLogout = this.handeLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  handleLogin(user) {
    this.setState({
      activeUser: user
    });
  }



  render() {
    const { activeUser, committeeUser } = this.state;
    return (

      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} committeeUser={committeeUser} handeLogout={this.handeLogout} />
        </Route>
        <Route exact path="/login">
          <LoginPage handleLogin={this.handleLogin} />
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
