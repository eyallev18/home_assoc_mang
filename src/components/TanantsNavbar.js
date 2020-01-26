import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TanantsNavbar.css'

class TanantsNavbar extends Component {
    constructor(props) {
        super(props);


    }
    render() {
        const { activeUser } = this.props;

        const dashboardLink = activeUser ? <Nav.Link href="#/dashboard">תצוגות</Nav.Link> : null;
        const tanantsLink = activeUser ? <Nav.Link href="#/tanants">דיירים</Nav.Link> : null;
        const messagesLink = activeUser ? <Nav.Link href="#/messages">הודעות</Nav.Link> : null;
        const issuesLink = activeUser ? <Nav.Link href="#/issues">תקלות</Nav.Link> : null;
        const votingLink = activeUser ? <Nav.Link href="#/voting" >הצבעות</Nav.Link> : null;
        const signupLink = !activeUser ? <Nav.Link href="#/signup">רישום</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">כניסה</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link className="leftlink"  >התנתק</Nav.Link> : null;
        //onClick={this.logout}
        return (
            <Navbar className="hebrew" bg="primary" expand="lg">
                <Navbar.Brand href="#/">ועד בית</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {dashboardLink}
                    </Nav>
                    <Nav className="mr-auto">
                        {tanantsLink}
                    </Nav>
                    <Nav className="mr-auto">
                        {messagesLink}
                    </Nav>
                    <Nav className="mr-auto">
                        {issuesLink}
                    </Nav>
                    <Nav className="mr-auto">
                        {votingLink}
                    </Nav>
                    <Nav >
                        {signupLink}
                        {loginLink}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );


    }


}
export default TanantsNavbar;