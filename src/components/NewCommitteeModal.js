import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './NewCommitteeModal.css'
class NewCommitteeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lname: "",
            email: "",
            pwd: "",
            pwdv: "",
            town: "",
            street: "",
            building: "",
            apartment: "",
            isCommitteeMember: true

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
        const { lname, email, pwd, pwdv, apartment, street, building, town, isCommitteeMember } = this.state;
        const newCommitteeUser = { lname, email, pwd, apartment, isCommitteeMember };
        this.props.handleNewCommitteeUser(newCommitteeUser);  // in TanantsNavbar.js
        this.props.handleClose();
        this.setState({
            lname: "",
            email: "",
            pwd: "",
            apartment: "",
            street: "",
            building: "",
            town: "",
            isCommitteeMember: true
        })
    }

    /* <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>
    
      <Form.Group controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>
    
      <Form.Group controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
    
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>
    <Form.Group>
                                <Form.Label> מספר בית</Form.Label>
                                <Form.Control name="building" value={building}
                                    type="text" placeholder="הכנס מספר בית " onChange={this.handleInputChange} />
                            </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>
    
      <Form.Group id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */
















    render() {
        const { show, handleClose } = this.props;
        const { lname, email, pwd, pwdv, apartment, town, street, building } = this.state;

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
                                <Form.Control name="town" value={town}
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