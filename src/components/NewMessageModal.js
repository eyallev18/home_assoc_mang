import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './NewMessageModal.css'
class NewMessageModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createdBy: "",
            community: null,
            title: "",
            details: "",
            priority: "רגילה",
            comments: ""
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    }
    handleOptionChange = changeEvent => {
        this.setState({
            priority: changeEvent.target.value
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    createMessage() {
        const { createdBy, community, title, details, priority, comments } = this.state;
        const newMessage = { createdBy, community, title, details, priority, comments };
        this.props.handleNewMessage(newMessage);
        this.props.handleClose();
        this.setState({
            createdBy: "",
            community: null,
            title: "",
            details: "",
            priority: "רגילה",
            comments: ""
        })
    }

    render() {
        const { show, handleClose } = this.props;
        const { createdBy, community, title, details, priority, comments } = this.state;

        return (
            <Modal className="align_right" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>הודעה חדשה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>כותרת</Form.Label>
                            <Form.Control name="title" value={title}
                                type="text" placeholder="הכנס את כותרת ההודעה" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>פרטים</Form.Label>
                            <Form.Control name="details" value={details}
                                type="text" placeholder="הכנס את פרטיי ההודעה" onChange={this.handleInputChange} />
                        </Form.Group>


                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    עדיפות
                                  </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="רגילה"
                                        name="formHorizontalRadios"
                                        value="רגילה"
                                        checked={this.state.priority === "רגילה"}
                                        id="formHorizontalRadios1"
                                        onChange={this.handleOptionChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="גבוהה"
                                        name="formHorizontalRadios"
                                        value="גבוהה"
                                        checked={this.state.priority === "גבוהה"}
                                        id="formHorizontalRadios2"
                                        onChange={this.handleOptionChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="דחופה"
                                        name="formHorizontalRadios"
                                        value="דחופה"
                                        checked={this.state.priority === "דחופה"}
                                        id="formHorizontalRadios3"
                                        onChange={this.handleOptionChange}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>הערות</Form.Label>
                            <Form.Control as="textarea" rows="3" name="comments" value={comments} onChange={this.handleInputChange} />
                        </Form.Group>

                    </Form>






                </Modal.Body>

                <Modal.Footer >
                    <Button variant="secondary" onClick={handleClose}>
                        בטל
                </Button>
                    <Button variant="primary" onClick={this.createMessage}>
                        צור הודעה
                </Button>
                </Modal.Footer>
            </Modal>);
    }
}

export default NewMessageModal;