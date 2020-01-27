import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';

class NewCommitteeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lname: "",
            email: "",
            pwd: "",
            pwdv: "",
            apartment: "",
            isCommitteeMember: true

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createCommiteeUser = this.createCommiteeUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createCommiteeUser() {
        const { lname, email, pwd, pwdv, apartment, isCommitteeMember } = this.state;
        const newCommiteeUser = { lname, email, pwd, pwdv, apartment, isCommitteeMember };
        this.props.handleNewCommiteeUser(newCommiteeUser);
        this.props.handleClose();
        this.setState({
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            isCommitteeMember: true
        })
    }

    render() {
        const { show, handleClose } = this.props;
        const { lname, email, pwd, pwdv, apartment } = this.state;

        return (
            <Modal show={show} onHide={handleClose}>
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

                        <Form.Group>
                            <Form.Label>סיסמא </Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="הכנס סיסמא " onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>אימות סיסמא </Form.Label>
                            <Form.Control name="pwdv" value={pwdv}
                                type="password" placeholder="הכנס סיסמא שוב " onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>מספר דירה</Form.Label>
                            <Form.Control name="apartment" value={apartment}
                                type="text" placeholder="הכנס מספר דירה" onChange={this.handleInputChange} />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button variant="success" onClick={this.createCommiteeUser}>
                        Create
            </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewCommitteeModal;