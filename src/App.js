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
      committeeUser: null,
      isCommitteeUser: false,
      mycommunity: null

    }
    //this.handeLogout = this.handeLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handeLogout = this.handeLogout.bind(this);


  }


  handleGetCommunity = (community) => {
    this.setState({ mycommunity: community })
  }

  handleLogin(user) {
    this.setState({
      activeUser: user,
      isCommitteeUser: user.attributes.isCommitteeMember
    });

  }

  handeLogout() {
    if (Parse.User.current()) {
      Parse.User.logOut();
    }
    this.setState({
      activeUser: null,
      isCommitteeUser: false
    })
  }

  render() {
    const { activeUser, committeeUser, isCommitteeUser, mycommunity } = this.state;
    return (

      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={this.handeLogout} />
        </Route>
        <Route exact path="/login">
          <LoginPage handleLogin={this.handleLogin} isCommitteeUser={isCommitteeUser} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage activeUser={activeUser} handeLogout={this.handeLogout} mycommunity={mycommunity} isCommitteeUser={isCommitteeUser} handleGetCommunity={this.handleGetCommunity} />
        </Route>
        <Route exact path="/tanants">
          <TanantsPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} handeLogout={this.handeLogout} handleGetCommunity={this.handleGetCommunity} mycommunity={mycommunity} />
        </Route>
        <Route exact path="/messages">
          <MessagesPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />
        </Route>
        <Route exact path="/issues">
          <IssuesPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} />
        </Route>
        <Route exact path="/voting">
          <VotingPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />
        </Route>


      </Switch>

    );
  }
}

export default App;
