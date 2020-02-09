import React, { Component } from 'react';
import './DashBoard.css'
import { Form, Button, Alert, Col } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
import TanantsPage from './TanantsPage';
import MessagesPage from './MessagesPage';
import VotingPage from './VotingPage';

import { Redirect } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { activeUser, committeeUser, handeLogout, mycommunity, isCommitteeUser } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }



        return (
            <div>
                <TanantsNavbar activeUser={activeUser} committeeUser={committeeUser} handeLogout={handeLogout} />

                <div className="mycontainer" >

                    <div className="rightitem scroolbar" >
                        <VotingPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />

                    </div>
                    <div className="rightitem scroolbar">
                        <MessagesPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />


                    </div>

                </div>

            </div>



        );

    }
}

export default DashBoard;





