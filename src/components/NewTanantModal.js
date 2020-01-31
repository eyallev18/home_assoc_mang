import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './NewTanantModal.css'
import { Link, Redirect } from 'react-router-dom';
class NewTanantModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            isCommitteeMember: false,
            community: null



        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createTanantUser = this.createTanantUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createTanantUser() {
        const { lname, email, pwd, apartment, isCommitteeMember } = this.state;
        const newTanantUser = { lname, email, pwd, apartment, isCommitteeMember };
        this.props.handleTanantUser(newTanantUser);  // in TanantsNavbar.js
        // this.props.handleLogin(newCommitteeUser);
        this.props.handleClose();
        this.setState({
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            isCommitteeMember: false,
            community: null

        })
    }


    render() {
        const { show, handleClose, handleLogin } = this.props;
        const { lname, email, pwd, apartment } = this.state;

        return (
            <Modal className="align_right" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>רישום דייר בבנין</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label controlId="formGridZip">שם דייר</Form.Label>
                            <Form.Control name="lname" value={lname}
                                type="text" placeholder="הכנס שם דייר " onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label controlId="formGridZip">כתובת אימייל</Form.Label>
                            <Form.Control name="email" value={email}
                                type="text" placeholder="הכנס כתובת אימייל" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label controlId="formGridZip">סיסמא </Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="הכנס סיסמא " onChange={this.handleInputChange} />
                        </Form.Group>



                        <Form.Group>
                            <Form.Label controlId="formGridZip"> מספר דירה</Form.Label>
                            <Form.Control name="apartment" value={apartment}
                                type="text" placeholder="הכנס מספר  דירה " onChange={this.handleInputChange} />
                        </Form.Group>




                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
            </Button>
                    <Button variant="success" onClick={this.createTanantUser}>
                        צור
            </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewTanantModal;