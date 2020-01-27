import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TanantsNavbar.css'
import NewCommitteeModal from '../components/NewCommitteeModal';
import Parse from 'parse'
import TanantsModel from '../model/TanantsModel'

class TanantsNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showNewCommitteModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleNewCommitteeUser = this.handleNewCommitteeUser.bind(this);


    }
    handleClose() {
        this.setState({
            showNewCommitteModal: false
        })
    }
    handleNewCommitteeUser(newCommiteeUser) {
        const Committee = Parse.Object.extend('Committee');
        const newParseCommittee = new Committee();

        newParseCommittee.set('lname', newCommiteeUser.lname);
        newParseCommittee.set('email', newCommiteeUser.email);
        newParseCommittee.set('pwd', newCommiteeUser.pwd);
        newParseCommittee.set('apartment', newCommiteeUser.apartment);
        newParseCommittee.set('isCommitteeMember', newCommiteeUser.isCommitteeMember);


        newParseCommittee.save().then(theCreatedParseCommittee => {
            console.log('Committee created', theCreatedParseCommittee);
            this.setState({
                recipes: this.state.users.concat(new TanantsModel(theCreatedParseCommittee))
            })
        }, error => {
            console.error('Error while creating Committee: ', error);
        });
    }
    render() {
        const { showNewCommitteModal } = this.state;
        const { activeUser, committeeUser } = this.props;

        const dashboardLink = activeUser ? <Nav.Link className="navlink" href="#/dashboard">תצוגות</Nav.Link> : null;
        const tanantsLink = activeUser ? <Nav.Link className="navlink" href="#/tanants">דיירים</Nav.Link> : null;
        const messagesLink = activeUser ? <Nav.Link className="navlink" href="#/messages">הודעות</Nav.Link> : null;
        const issuesLink = activeUser ? <Nav.Link className="navlink" href="#/issues">תקלות</Nav.Link> : null;
        const votingLink = activeUser ? <Nav.Link className="navlink" href="#/voting" >הצבעות</Nav.Link> : null;
        const signupLink = !activeUser && !committeeUser ? <Nav.Link className="navlink" onClick={() => { this.setState({ showNewCommitteeModal: true }) }} > רישום ועד בית</Nav.Link> : null;
        const loginLink = !activeUser && committeeUser ? <Nav.Link className="navlink" href="#/login"> כניסת דיירים או ועד בית</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link className="navlink"  >התנתק</Nav.Link> : null;
        //onClick={this.logout}
        return (
            <div>
                <Navbar className="hebrew" bg="primary" expand="lg">
                    <Navbar.Brand className="navlink" href="#/">ועד בית</Navbar.Brand>
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
                <NewCommitteeModal show={showNewCommitteModal} handleClose={this.handleClose} handleNewRecipe={this.handleNewCommiteeUser} />
            </div>
        );


    }


}
export default TanantsNavbar;