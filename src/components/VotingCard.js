import React, { Component } from 'react';
import './VotingCard.css'
import { Card, Button } from 'react-bootstrap';

class VotingCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { voting } = this.props;
        //const cardstyle = user.isCommitteeMember ? { width: '18rem', backgroundColor: 'hsl(207, 48%, 85%)', marginBottom: '15px' } : { width: '18rem', backgroundColor: '#e9ecef', marginBottom: '15px' };
        //const status = user.isCommitteeMember ? " ועד הבית" : "דיירים";


        return (
            <div className="user">

                <Card>
                    <Card.Header>{voting.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{voting.details}</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary">הצבע</Button>
                    </Card.Body>
                </Card>



            </div>
        );
    }
}

export default VotingCard;