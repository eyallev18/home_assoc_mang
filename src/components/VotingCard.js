import React, { Component } from 'react';
import './VotingCard.css'
import { Card, Button, ButtonGroup } from 'react-bootstrap';

class VotingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentvote: null


        }
        this.handlesetVote = this.handlesetVote.bind(this);
    }

    handlesetVote(voting, oneoption) {
        this.props.setVote(voting, oneoption);
    }

    render() {
        const { voting } = this.props;
        //const cardstyle = user.isCommitteeMember ? { width: '18rem', backgroundColor: 'hsl(207, 48%, 85%)', marginBottom: '15px' } : { width: '18rem', backgroundColor: '#e9ecef', marginBottom: '15px' };
        //const status = user.isCommitteeMember ? " ועד הבית" : "דיירים";
        const buttonGroup = voting.options.map(oneoption =>
            <Button variant="primary" className="needmargin" onClick={() => { this.handlesetVote(voting, oneoption) }}>{oneoption}</Button>
        )


        return (
            <div className="user">

                <Card>
                    <Card.Header>{voting.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{voting.details}</Card.Title>
                        <Card.Text>

                        </Card.Text>
                        <ButtonGroup size="lg">
                            {/*<Button variant="primary" onClick={() => { this.handlesetVote(voting) }}>הצבע</Button> */}
                            {buttonGroup}
                        </ButtonGroup>
                    </Card.Body>
                </Card>



            </div>
        );
    }
}

export default VotingCard;