import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import Button from "../components/Button";

const { Body, Header, Title } = Card;

class MessageCard extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isActive: false
        // }

    }
    // toggleVisibility = () =>
    //     this.setState(prevState => ({ isActive: !this.state.isActive }));

    render() {
        const { message } = this.props;
        return (

            <div>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={message.id}>
                        {message.title}   נוצרה על ידי: {message.createdBy}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={message.id}>
                        <Card.Body>{message.details} </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>

        );
    }
}

export default MessageCard;

