import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './NewVotingModal.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewVotingModal extends Component {
    constructor(props) {
        super(props);


        this.state = {
            createdBy: "",
            title: "",
            details: "",
            dueDate: new Date(),
            votes: [],
            options: [],
            comments: ""

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createVoting = this.createVoting.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
    handleChange = date => {
        this.setState({
            dueDate: date
        });
    };
    handleOptionChange = changeEvent => {
        this.setState({
            priority: changeEvent.target.value
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.type == "checkbox") {
            this.setState({
                options: this.state.options.concat(target.name)
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }
    createVoting() {
        const { createdBy, createdAt, title, details, dueDate, votes, options } = this.state;
        const newVoting = { createdBy, title, details, dueDate, votes, options };
        this.props.handleNewVoting(newVoting);
        this.props.handleClose();
        this.setState({
            createdBy: "",
            title: "",
            details: "",
            dueDate: new Date(),
            votes: [],
            options: [],
            comments: ""
        })
    }
    render() {
        const { show, handleClose } = this.props;
        const { createdBy, createdAt, title, details, dueDate, votes, options, comments } = this.state;
        return (
            <Modal className="align_right" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>הצבעה חדשה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>כותרת</Form.Label>
                            <Form.Control name="title" value={title}
                                type="text" placeholder="הכנס את כותרת ההצבעה" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>פרטים</Form.Label>
                            <Form.Control name="details" value={details}
                                type="text" placeholder="הכנס את פרטיי ההצבעה" onChange={this.handleInputChange} />
                        </Form.Group>




                        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>הערות</Form.Label>
                            <Form.Control as="textarea" rows="3" name="comments" value={comments} onChange={this.handleInputChange} />
                        </Form.Group> */}
                        <Form.Group as={Row} controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 4 }}>
                                <Form.Check label="בעד" type="checkbox" value="בעד" name="בעד" onChange={this.handleInputChange} />
                                <Form.Check label="נגד" type="checkbox" value="נגד" name="נגד" onChange={this.handleInputChange} />
                                <Form.Check label="נמנע" type="checkbox" value="נמנע" name="נמנע" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>תאריך סיום הצבעה</Form.Label>
                            <DatePicker selected={this.state.dueDate} onChange={this.handleChange} showTimeSelect dateFormat="Pp" />
                        </Form.Group>
                    </Form>




                </Modal.Body>

                <Modal.Footer >
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
                </Button>
                    <Button variant="primary" onClick={this.createVoting}>
                        צור הצבעה
                </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewVotingModal;



