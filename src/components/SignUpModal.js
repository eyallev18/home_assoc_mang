import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import './SignUpModal.css'
import { Link, Redirect } from 'react-router-dom';
class SignUpModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { show, handleClose, titleText, bodyText, colorstyle } = this.props;
        return (
            <Modal className="align_right" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="myModalCss" style={colorstyle} > {titleText}  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="myModalCss">

                    {bodyText}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        סגור
    </Button>

                </Modal.Footer>
            </Modal>);
    }

}
export default SignUpModal;