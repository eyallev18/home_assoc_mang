import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "react-bootstrap";
import Button from "../components/Button";

const { Body, Header, Title } = Card;

class MessageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }

    }
    toggleVisibility = () =>
        this.setState(prevState => ({ isActive: !this.state.isActive }));

    render() {
        return (

            <div>
                <Col xs={9}>
                    <Button onClick={this.toggleVisibility}>
                        {!this.state.isActive ? "+" : "-"}
                    </Button>
                    <Title style={{ display: "inline-block" }}>
                        {this.props.title}
                    </Title>
                </Col>
                <Col style={{ paddingTop: 7 }} xs={3}>
                    Test Text 123
            </Col>
            </div>

        );
    }
}

export default MessageCard;

MessageCard.propTypes = {
    title: PropTypes.string.isRequired
};