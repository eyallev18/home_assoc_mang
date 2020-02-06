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
        var divstyle = { backgroundColor: 'rgb(220,220,220)' };
        if (message.priority === "רגילה") {
            divstyle = { backgroundColor: 'rgb(220,220,220)' };
        } else {
            if (message.priority === "גבוהה") {
                divstyle = { backgroundColor: 'yellow' };

            } else {
                divstyle = { backgroundColor: 'orange' };
            }


        }
        const datecreated = message.createdAt.toLocaleString();
        return (

            <div>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={message.id} style={divstyle}>
                        <div className="buttonHeader">
                            <span style={{ color: 'blue', fontWeight: 'bold' }}> {message.title} </span><img src="balckV.png" style={{ width: '20px', float: 'left', margin: "0 5px" }} /> <span style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginLeft: '5px', float: 'left' }}>  נוצרה על ידי:   {message.createdBy} <br />{datecreated} </span>

                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={message.id}>
                        <Card.Body>{message.details}<br />{message.comments} </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>

        );
    }
}

export default MessageCard;

