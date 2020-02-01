import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TanantsNavbar.css'
import NewCommitteeModal from '../components/NewCommitteeModal';
import NewTanantModal from '../components/NewTanantModal';
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
            showNewTanantModal: false,
            showSignUpModal: false,
            //isCommitteeMember: false,
            //activeUser: this.props.activeUser,
            committeeUser: false,
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
            showSignUpModal: false,
            showNewTanantModal: false
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
        const newComunity = new Parse.Object("Community");
        newParseCommittee.set('community', newComunity);
        newParseCommittee.set('password', newCommitteeUser.pwd);



        newParseCommittee.signUp().then((newParseCommittee) => {
            // if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(newParseCommittee)}`);
            console.log('User signed up', newParseCommittee);
            console.log(newParseCommittee.id)

            const Community = Parse.Object.extend('Community');
            const query = new Parse.Query(Community);
            // here you put the objectId that you want to update
            query.get(newComunity.id).then((object) => {
                object.set('City', newCommitteeUser.City);
                object.set('street', newCommitteeUser.street);
                object.set('building', newCommitteeUser.building);
                object.save().then((response) => {
                    // You can use the "get" method to get the value of an attribute
                    // Ex: response.get("<ATTRIBUTE_NAME>")
                    // if (typeof document !== 'undefined') document.write(`Updated Community: ${JSON.stringify(response)}`);
                    console.log('Updated Community', response);
                }, (error) => {
                    //  if (typeof document !== 'undefined') document.write(`Error while updating Community: ${JSON.stringify(error)}`);
                    console.error('Error while updating Community', error);
                });
            });




            this.setState({
                users: this.state.users.concat(new TanantsModel(newParseCommittee)),
                showSignUpModal: true,
                titleText: "רישום חבר ועד בוצע בהצלחה !",
                bodyText: "בצע כניסה להמשך עבודה",
                colorstyle: greencolor
            })
        }).catch(error => {

            const Community = Parse.Object.extend('Community');
            const query = new Parse.Query(Community);
            // here you put the objectId that you want to delete
            query.get(newComunity.id).then((object) => {
                object.destroy().then((response) => {
                    // if (typeof document !== 'undefined') document.write(`Deleted Community: ${JSON.stringify(response)}`);
                    console.log('Deleted Community', response);
                }, (error) => {
                    //   if (typeof document !== 'undefined') document.write(`Error while deleting Community: ${JSON.stringify(error)}`);
                    console.error('Error while deleting Community', error);
                });
            });







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
        const { showNewCommitteeModal, showNewTanantModal, showSignUpModal, isCommitteeMember, bodyText, titleText, colorstyle } = this.state;
        const { activeUser, isCommitteeUser } = this.props;

        const dashboardLink = activeUser ? <Nav.Link className="navlink" href="#/dashboard" >תצוגות</Nav.Link> : null;
        const tanantsLink = activeUser ? <Nav.Link className="navlink" href="#/tanants">דיירים</Nav.Link> : null;
        const messagesLink = activeUser ? <Nav.Link className="navlink" href="#/messages">הודעות</Nav.Link> : null;
        const issuesLink = activeUser ? <Nav.Link className="navlink" href="#/issues">תקלות</Nav.Link> : null;
        const votingLink = activeUser ? <Nav.Link className="navlink" href="#/voting" >הצבעות</Nav.Link> : null;

        const adminLink = activeUser && isCommitteeUser ? <NavDropdown title="ניהול ועד בית" id="basic-nav-dropdown">
            <NavDropdown.Item className="diffcolor" onClick={() => { this.setState({ showNewTanantModal: true }) }}>רישום דיירים</NavDropdown.Item>
            <NavDropdown.Item href="#action/1.2" className="diffcolor">עריכת רשימת דיירים</NavDropdown.Item>
            <NavDropdown.Item href="#action/1.3" className="diffcolor">מחיקת דיירים</NavDropdown.Item>
            <NavDropdown.Item href="#action/1.4" className="diffcolor">החלף ועד</NavDropdown.Item>
        </NavDropdown> : null;

        const signupLink = !activeUser ? <Nav.Link className="navlink different" onClick={() => { this.setState({ showNewCommitteeModal: true }) }} > רישום ועד בית חדש (מבוצע בפעם הראשונה ע"י ועד הבית ) </Nav.Link> : null;
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
                            {adminLink}
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
                        <Nav className="mr-auto">

                            {loginLink}
                        </Nav>
                        <Nav className="ml-auto" >
                            {signupLink}

                            {logoutLink}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <NewCommitteeModal activeUser={activeUser} isCommitteeUser={isCommitteeUser} show={showNewCommitteeModal} handleClose={this.handleClose} handleNewCommitteeUser={this.handleNewCommitteeUser} />
                <NewTanantModal activeUser={activeUser} isCommitteeUser={isCommitteeUser} show={showNewTanantModal} handleClose={this.handleClose} handleNewTanantUser={this.handleNewTanantUser} />

                <SignUpModal show={showSignUpModal} handleClose={this.handleClose} titleText={titleText} bodyText={bodyText} colorstyle={colorstyle} />
            </div>
        );


    }


}
export default TanantsNavbar;