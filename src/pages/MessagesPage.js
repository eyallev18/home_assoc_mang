import React, { Component } from 'react';
import './MessagePage.css'
//import { Form, Button, Alert } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import { Link, Redirect } from 'react-router-dom';
import TanantsNavbar from '../components/TanantsNavbar';

class MessagePage extends Component {
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
                <h1>I'm Message Page</h1>

            </div>



        );

    }
}

export default MessagePage;





