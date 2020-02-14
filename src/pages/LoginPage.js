import React, { Component } from 'react';
import './LoginPage.css'
import { Form, Button, Alert, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            //isCommitteeMember: false,
            showInvalidLoginError: false,
            redirectToTanantsPage: false

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);

    }
    // async componentDidMount() {

    //     const User = new Parse.User();
    //     const query = new Parse.Query(User);

    //     query.get(Parse.User.current()).then((user) => {
    //         // if (typeof document !== 'undefined') document.write(`User found: ${JSON.stringify(user)}`);
    //         console.log('User found', user);
    //     }, (error) => {
    //         if (typeof document !== 'undefined') document.write(`Error while fetching user: ${JSON.stringify(error)}`);
    //         console.error('Error while fetching user', error);
    //     });


    // }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    login() {
        const { handleLogin, isCommitteeUser } = this.props;
        const { lname, pwd } = this.state;
        Parse.User.logIn(lname, pwd).then((user) => {
            // Do stuff after successful login
            if (typeof document !== 'undefined')
                //document.write(`Logged in user: ${JSON.stringify(user)}`);
                console.log('Logged in user', user);
            // 1) Updating App component on the new active user
            handleLogin(user);
            var currentUser = Parse.User.current();
            console.log(currentUser);
            const User = new Parse.User();
            const query = new Parse.Query(User);

            query.get(currentUser.id).then((user) => {
                // if (typeof document !== 'undefined') document.write(`User found: ${JSON.stringify(user)}`);
                console.log('User found', user.attributes.isCommitteeMember);

            }, (error) => {
                //  if (typeof document !== 'undefined') document.write(`Error while fetching user: ${JSON.stringify(error)}`);
                console.error('Error while fetching user', error);
            });
            // this.componentDidMount();
            //console.log(IsCommimittee.length);
            //  const commiteUser = Parse.Object.extend('User');
            //  const query = new Parse.Query(commiteUser);
            //  query.equalTo("isCommitteeMember", true);
            //   query.find()

            // 2) navigate to recipes page
            this.setState({
                redirectToTanantsPage: true
            });


        }).catch(error => {
            {/*  if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);*/ }
            console.error('Error while logging in user', error);
            this.setState({
                showInvalidLoginError: true
            });
        })


    }

    render() {
        const { lname, email, pwd, apartment, showInvalidLoginError, redirectToTanantsPage } = this.state;
        if (redirectToTanantsPage) {
            return <Redirect to="/tanants" />
        }


        const errorAlert = showInvalidLoginError ? <Alert variant="danger">שם או סיסמא שגויים או לא במערכת , אנא נסה שוב</Alert> : null;
        return (
            <div className="p-login">
                <div className="main">
                    <h1>כניסת דייר או חבר ועד</h1>

                    {errorAlert}
                    <Form>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="6">שם הדייר</Form.Label>
                            <Form.Control name="lname" value={lname}
                                type="text" placeholder="הכנס שם משפחה" onChange={this.handleInputChange} />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label>כתובת אימייל</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="הכנס כתובת אימייל" onChange={this.handleInputChange} />
                        </Form.Group> */}

                        <Form.Group as={Row} controlId="formBasicPassword1">
                            <Form.Label column sm="6">סיסמא</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="סיסמא" onChange={this.handleInputChange} />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicPassword">
                            <Form.Label>מספר דירה</Form.Label>
                            <Form.Control name="apartment" value={apartment}
                                type="text" placeholder="דירה מספר" onChange={this.handleInputChange} />
                        </Form.Group> */}
                        <Button variant="success" type="button" block onClick={this.login}>
                            היכנס
                    </Button>
                    </Form>
                </div>
            </div>



        );

    }
}

export default LoginPage;





