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
            // users: [],
            showNewCommitteeModal: false,
            showNewTanantModal: false,
            showSignUpModal: false,
            //isCommitteeMember: false,
            //activeUser: this.props.activeUser,
            committeeUser: false,
            redirectToDashBoardPage: false,
            titleText: "",
            bodyText1: "",
            bodyText2: "",
            bodyText3: "",
            bodyText4: ""

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleNewCommitteeUser = this.handleNewCommitteeUser.bind(this);
        this.handleNewTanantUser = this.handleNewTanantUser.bind(this);



    }

    // async componentDidMount() {
    //     if (this.props.activeUser) {
    //         const User = Parse.Object.extend('User');
    //         const query = new Parse.Query(User);
    //         query.equalTo("community", this.props.activeUser.attributes.community);

    //         const parseUsers = await query.find();
    //         const users = parseUsers.map(parseUser => new TanantsModel(parseUser));
    //         this.setState({ users });
    //         // query.find().then((parseRecipes) => {
    //         //     const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
    //         //     this.setState({ recipes });
    //         // }, (error) => {
    //         //     console.error('Error while fetching Recipe', error);
    //         // });
    //     }
    // }



    handleClose() {
        this.setState({
            showNewCommitteeModal: false,
            showSignUpModal: false,
            showNewTanantModal: false
        })
    }
















    handleNewTanantUser(newTanantUser) {

        const greencolor = { color: 'green' };
        const redcolor = { color: 'red' };

        const newParseCommittee = new Parse.User();

        newParseCommittee.set('username', newTanantUser.lname);
        newParseCommittee.set('email', newTanantUser.email);
        newParseCommittee.set('apartment', newTanantUser.apartment);
        newParseCommittee.set('isCommitteeMember', newTanantUser.isCommitteeMember);

        //const newComunity = new Parse.Object("Community");
        newParseCommittee.set('community', this.props.activeUser.attributes.community);
        newParseCommittee.set('password', newTanantUser.pwd);

        const sessionToken = Parse.User.current().get("sessionToken");

        newParseCommittee.signUp().then((newParseCommittee) => {
            console.log(Parse.User.current());
            // if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(newParseCommittee)}`);
            Parse.User.become(sessionToken).then(function (user) {
                // The current user is now set back to the teacher.
                // Continue doing what you want
                console.log(Parse.User.current());
            }, function (error) {
                // The token could not be validated.
                alert('error');
            });
            console.log('User signed up', newParseCommittee);
            console.log(newParseCommittee.id)

            const tanantDetails1 = " העבר לדייר: ";
            const tanantDetails2 = " שם משתמש:   " + newTanantUser.lname;
            const tanantDetails3 = "  אימייל:    " + newTanantUser.email;
            const tanantDetails4 = "   סיסמא:    " + newTanantUser.pwd;




            this.setState({
                users: this.props.users.concat(new TanantsModel(newParseCommittee)),
                showSignUpModal: true,
                titleText: "רישום דייר בוצע בהצלחה !",
                bodyText1: tanantDetails1,
                bodyText2: tanantDetails2,
                bodyText3: tanantDetails3,
                bodyText4: tanantDetails4,
                colorstyle: greencolor
            })
        }).catch(error => {









            // if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
            console.error('Error while signing up user', error);
            //const errorTranslate = await translate(error, 'he');
            this.setState({
                showSignUpModal: true,
                titleText: "רישום דייר נכשל ",
                bodyText1: "שם קיים במערכת", //Translate
                bodyText2: "",
                bodyText3: "",
                bodyText4: "",

                colorstyle: redcolor
            })
        });



    }



    //end of Tanant registeration

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
                users: this.props.users.concat(new TanantsModel(newParseCommittee)),
                showSignUpModal: true,
                titleText: "רישום חבר ועד בוצע בהצלחה !",
                bodyText1: "בצע כניסה להמשך עבודה",
                bodyText2: "",
                bodyText3: "",
                bodyText4: "",
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
                bodyText1: "שם קיים במערכת", //Translate
                bodyText2: "",
                bodyText3: "",
                bodyText4: "",
                colorstyle: redcolor
            })
        });



    }
    render() {
        const { showNewCommitteeModal, showNewTanantModal, showSignUpModal, isCommitteeMember, bodyText1, bodyText2, bodyText3, bodyText4, titleText, colorstyle } = this.state;
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

                <SignUpModal show={showSignUpModal} handleClose={this.handleClose} titleText={titleText} bodyText1={bodyText1} bodyText2={bodyText2} bodyText2={bodyText2} bodyText3={bodyText3} bodyText4={bodyText4} colorstyle={colorstyle} />
            </div>
        );


    }


}
export default TanantsNavbar;