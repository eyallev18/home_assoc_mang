import React, { Component } from 'react';
import './DashBoard.css'
//import { Form, Button, Alert } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
import { Redirect } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { activeUser, committeeUser, handeLogout } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }



        return (
            <div>
                <TanantsNavbar activeUser={activeUser} committeeUser={committeeUser} handeLogout={handeLogout} />
                <h1>I'm DashBoard Page</h1>

            </div>



        );

    }
}

export default DashBoard;





