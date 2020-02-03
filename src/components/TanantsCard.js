import React, { Component } from 'react';
import './TanantsCard.css'
import { Card } from 'react-bootstrap';

class TanantsCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { user } = this.props;

        return (
            <div className="user">



                <Card border="success" style={{ width: '18rem' }}>
                    <Card.Header>{user.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>{user.email}</Card.Title>
                        <Card.Text>
                            {user.apartment}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default TanantsCard;