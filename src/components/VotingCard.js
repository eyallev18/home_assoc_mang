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



        const buttonGroup = voting.options.map((oneoption, i) =>

            <Button variant={buttonstyle[i]} className="needmargin" onClick={() => { this.handlesetVote(voting, oneoption) }}>{oneoption}</Button>

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
                            <Button variant="secondary" className="needmargin" onClick={() => { this.handlesetVote(voting, "נמנע") }}>נמנע/ת</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>



            </div>
        );
    }
}

export default VotingCard;