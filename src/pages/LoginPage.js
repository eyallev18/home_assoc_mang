import React, { Component } from 'react';
import './LoginPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
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
            isCommitteeMember: false

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        //   this.login = this.login.bind(this);

    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { lname, email, pwd, apartment, showInvalidLoginError } = this.state;

        const errorAlert = showInvalidLoginError ? <Alert variant="danger">Invalid email or password!</Alert> : null;
        return (
            <div className="p-login">
                <div className="main">
                    <h1>כניסת דייר או חבר ועד</h1>

                    {errorAlert}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>שם הדייר</Form.Label>
                            <Form.Control name="lname" value={lname}
                                type="text" placeholder="הכנס שם משפחה" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>כתובת אימייל</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="הכנס כתובת אימייל" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>סיסמא</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="סיסמא" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>מספר דירה</Form.Label>
                            <Form.Control name="apartment" value={apartment}
                                type="text" placeholder="דירה מספר" onChange={this.handleInputChange} />
                        </Form.Group>
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





