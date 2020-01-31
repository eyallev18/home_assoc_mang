import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TanantsNavbar.css'
import NewCommitteeModal from '../components/NewCommitteeModal';
import Parse from 'parse'
import TanantsModel from '../model/TanantsModel'
import SignUpModal from '../components/SignUpModal';
import translate from 'translate';



class TanantsNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showNewCommitteeModal: false,
            showSignUpModal: false,
            isCommitteeMember: false,
            //activeUser: this.props.activeUser,
            committeeUser: this.props.committeeUser,
            redirectToDashBoardPage: false,
            titleText: "",
            bodyText: ""

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleNewCommitteeUser = this.handleNewCommitteeUser.bind(this);



    }


    handleClose() {
        this.setState({
            showNewCommitteeModal: false,
            showSignUpModal: false
        })
    }
    handleNewCommitteeUser(newCommitteeUser) {
        const greencolor = { color: 'green' };
        const redcolor = { color: 'red' };

        const newParseCommittee = new Parse.User();

        newParseCommittee.set('username', newCommitteeUser.lname);
        newParseCommittee.set('email', newCommitteeUser.email);
        newParseCommittee.set('apartment', newCommitteeUser.apartment);
        newParseCommittee.set('isCommitteeMember', newCommitteeUser.isCommitteeMember);
        newParseCommittee.set('community', new Parse.Object("Community"));
        newParseCommittee.set('password', newCommitteeUser.pwd);



        newParseCommittee.signUp().then((newParseCommittee) => {
            // if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(newParseCommittee)}`);
            console.log('User signed up', newParseCommittee);
            console.log(newCommitteeUser.id)
            this.setState({
                users: this.state.users.concat(new TanantsModel(newParseCommittee)),
                showSignUpModal: true,
                titleText: "רישום חבר ועד בוצע בהצלחה !",
                bodyText: "בצע כניסה להמשך עבודה",
                colorstyle: greencolor
            })
        }).catch(error => {
            // if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
            console.error('Error while signing up user', error);
            //const errorTranslate = await translate(error, 'he');
            this.setState({
                showSignUpModal: true,
                titleText: "רישום חבר ועד נכשל ",
                bodyText: "שם קיים במערכת", //Translate
                colorstyle: redcolor
            })
        });



    }
    render() {
        const { showNewCommitteeModal, showSignUpModal, isCommitteeMember, bodyText, titleText, colorstyle } = this.state;
        const { activeUser, committeeUser } = this.props;

        const dashboardLink = activeUser ? <Nav.Link className="navlink" href="#/dashboard">תצוגות</Nav.Link> : null;
        const tanantsLink = activeUser ? <Nav.Link className="navlink" href="#/tanants">דיירים</Nav.Link> : null;
        const messagesLink = activeUser ? <Nav.Link className="navlink" href="#/messages">הודעות</Nav.Link> : null;
        const issuesLink = activeUser ? <Nav.Link className="navlink" href="#/issues">תקלות</Nav.Link> : null;
        const votingLink = activeUser ? <Nav.Link className="navlink" href="#/voting" >הצבעות</Nav.Link> : null;
        const signupLink = !activeUser ? <Nav.Link className="navlink" onClick={() => { this.setState({ showNewCommitteeModal: true }) }} > רישום ועד בית</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link className="navlink" href="#/login"> כניסת דיירים או ועד בית</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link className="navlink" href="#/" onClick={this.props.handeLogout} >התנתק</Nav.Link> : null;
        // && !isCommitteeMember
        // && isCommitteeMember
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
                <NewCommitteeModal activeUser={activeUser} committeeUser={committeeUser} show={showNewCommitteeModal} handleClose={this.handleClose} handleNewCommitteeUser={this.handleNewCommitteeUser} handleLogin={this.handleLogin} />
                <SignUpModal show={showSignUpModal} handleClose={this.handleClose} titleText={titleText} bodyText={bodyText} colorstyle={colorstyle} />
            </div>
        );


    }


}
export default TanantsNavbar;