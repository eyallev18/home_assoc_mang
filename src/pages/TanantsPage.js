import React, { Component } from 'react';
import './TanantsPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
class TanantsPage extends Component {
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
                <h1>I'm Tanants Page</h1>

            </div>



        );

    }
}

export default TanantsPage;





