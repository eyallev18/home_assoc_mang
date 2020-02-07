import React, { Component } from 'react';
import './VotingCard.css'
import { Card, Button, ButtonGroup } from 'react-bootstrap';

class VotingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currentvote: null,
            alreadyVote: this.props.alreadyVote



        }
        this.handlesetVote = this.handlesetVote.bind(this);
    }

    handlesetVote(voting, oneoption) {
        this.props.setVote(voting, oneoption);
    }

    render() {
        const { voting, myvoting } = this.props;
        const { alreadyVote } = this.state;
        const Ivoted = alreadyVote || this.props.alreadyVote;
        //const cardstyle = user.isCommitteeMember ? { width: '18rem', backgroundColor: 'hsl(207, 48%, 85%)', marginBottom: '15px' } : { width: '18rem', backgroundColor: '#e9ecef', marginBottom: '15px' };
        //const status = user.isCommitteeMember ? " ועד הבית" : "דיירים";
        var buttonstyle = [];
        for (let i = 0; i < voting.options.length; i++) {
            if (voting.options[i] === "בעד") {
                buttonstyle.push("success")
            } else if (voting.options[i] === "נגד") {
                buttonstyle.push("danger")
            }
            else {
                buttonstyle.push("secondary")
            }
        }


        // buttonstyle = oneoption === "בעד" ? "Success" : "Danger"
        if (myvoting.length > 0 && !Ivoted) {
            var found = false;
            for (var j = 0; j < myvoting.length && !found; j++) {
                if (myvoting[j].voteId.id === voting.id) {
                    found = true;
                    this.setState({
                        alreadyVote: true

                    })
                }
            }
        }
        var buttonGroup = voting.options.map((oneoption, i) =>

            <Button variant={buttonstyle[i]} className="needmargin" onClick={() => { this.handlesetVote(voting, oneoption) }}>{oneoption}</Button>

        )
        //  buttonGroup += <Button variant="secondary" className="needmargin" onClick={() => { this.handlesetVote(voting, "נמנע") }}>נמנע/ת</Button>;
        const itemtodisplay = !Ivoted ? buttonGroup : <p style={{ color: 'red', backgroundColor: 'yellow', fontWeight: 'bold' }}> הצבעת כבר בהצבעה זו</p>
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
                            {itemtodisplay}
                            {/*<Button variant="secondary" className="needmargin" onClick={() => { this.handlesetVote(voting, "נמנע") }}>נמנע/ת</Button> */}
                        </ButtonGroup>
                    </Card.Body>
                </Card>



            </div>
        );
    }
}

export default VotingCard;