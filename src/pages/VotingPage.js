import React, { Component } from 'react';
import './VotingPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'

import TanantsNavbar from '../components/TanantsNavbar';

class VotingPage extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} />
                <h1>I'm Voting Page</h1>

            </div>



        );

    }
}

export default VotingPage;





