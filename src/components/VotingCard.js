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
        var buttonGroupdisabled = voting.options.map((oneoption, i) =>

            <Button variant={buttonstyle[i]} className="needmargin" disabled onClick={() => { this.handlesetVote(voting, oneoption) }}>{oneoption}</Button>

        )
        //  buttonGroup += <Button variant="secondary" className="needmargin" onClick={() => { this.handlesetVote(voting, "נמנע") }}>נמנע/ת</Button>;
        var d = new Date();
        var votEnded = d.getTime() > voting.dueDate.getTime();
        let peregrapg = <p></p>;



        // var itemtodisplay = !Ivoted || ? buttonGroup : <p style={{ color: 'red', fontWeight: 'bold' }}> הצבעת כבר בהצבעה זו</p>
        var itemtodisplay = buttonGroup;
        if (Ivoted && !votEnded) {
            itemtodisplay = <p style={{ color: 'red', fontWeight: 'bold' }}> הצבעת כבר בהצבעה זו</p>

        } else if (!Ivoted && votEnded) {
            itemtodisplay = <p style={{ color: 'red', fontWeight: 'bold' }}> לא הצבעת  בהצבעה זו <br /> ותאריך סוף הצבעה עבר</p>
        } else if (Ivoted && votEnded) {
            itemtodisplay = <p style={{ color: 'red', fontWeight: 'bold' }}> הצבעת כבר בהצבעה זו <br /> ותאריך סוף הצבעה עבר</p>
        }


        const itemtodisplay1 = Ivoted || votEnded ? buttonGroupdisabled : null
        var dd = String(voting.dueDate.getDate()).padStart(2, '0');
        var mm = String(voting.dueDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = voting.dueDate.getFullYear();
        var votEndHour = voting.dueDate.getHours();// > 12 ? voting.dueDate.getHours() - 12 : (voting.dueDate.getHours() < 10 ? "0" + voting.dueDate.getHours() : voting.dueDate.getHours());
        var votEndDaye = mm + '/' + dd + '/' + yyyy + ' בשעה : ' + votEndHour + ':00';

        return (
            <div className="user">

                <Card>
                    <Card.Header>{voting.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{voting.details}</Card.Title>
                        <Card.Text>
                            תאריך אחרון להצבעה : {votEndDaye}
                        </Card.Text>
                        <ButtonGroup size="lg">
                            {/*<Button variant="primary" onClick={() => { this.handlesetVote(voting) }}>הצבע</Button> */}
                            {itemtodisplay}
                            {itemtodisplay1}
                            {/*<Button variant="secondary" className="needmargin" onClick={() => { this.handlesetVote(voting, "נמנע") }}>נמנע/ת</Button> */}
                        </ButtonGroup>
                    </Card.Body>
                </Card>



            </div>
        );
    }
}

export default VotingCard;