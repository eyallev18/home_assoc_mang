import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './NewCommitteeModal.css'
import { Link, Redirect } from 'react-router-dom';
class NewCommitteeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lname: "",
            email: "",
            pwd: "",
            pwdv: "",
            City: "",
            street: "",
            building: "",
            apartment: "",
            isCommitteeMember: true,
            community: null



        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCommitteeUser = this.createCommitteeUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createCommitteeUser() {
        const { lname, email, pwd, pwdv, apartment, street, building, City, isCommitteeMember } = this.state;
        const newCommitteeUser = { lname, email, pwd, apartment, isCommitteeMember };
        this.props.handleNewCommitteeUser(newCommitteeUser);  // in TanantsNavbar.js
        // this.props.handleLogin(newCommitteeUser);
        this.props.handleClose();
        this.setState({
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            street: "",
            building: "",
            City: "",
            isCommitteeMember: true,
            community: null

        })
    }


    render() {
        const { show, handleClose, handleLogin } = this.props;
        const { lname, email, pwd, pwdv, apartment, City, street, building, redirectToDashBoardPage } = this.state;
        if (redirectToDashBoardPage) {
            return <Redirect to="/dashboard" />
        }
        return (
            <Modal className="align_right" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>רישום חבר ועד</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>שם דייר</Form.Label>
                            <Form.Control name="lname" value={lname}
                                type="text" placeholder="הכנס שם חבר ועד" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>כתובת אימייל</Form.Label>
                            <Form.Control name="email" value={email}
                                type="text" placeholder="הכנס כתובת אימייל" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip">סיסמא </Form.Label>
                                <Form.Control name="pwd" value={pwd}
                                    type="password" placeholder="הכנס סיסמא " onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip">אימות סיסמא </Form.Label>
                                <Form.Control name="pwdv" value={pwdv}
                                    type="password" placeholder="הכנס סיסמא שוב " onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>

                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip">עיר</Form.Label>
                                <Form.Control name="City" value={City}
                                    type="text" placeholder="הכנס שם עיר" onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip">רחוב</Form.Label>
                                <Form.Control name="street" value={street}
                                    type="text" placeholder="הכנס שם רחוב " onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip"> מספר בית</Form.Label>
                                <Form.Control name="building" value={building}
                                    type="text" placeholder="הכנס מספר בית " onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label as={Col} controlId="formGridZip"> מספר דירה</Form.Label>
                                <Form.Control name="apartment" value={apartment}
                                    type="text" placeholder="הכנס מספר  דירה " onChange={this.handleInputChange} />
                            </Form.Group>
                        </Form.Row>



                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
            </Button>
                    <Button variant="success" onClick={this.createCommitteeUser}>
                        צור
            </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewCommitteeModal;