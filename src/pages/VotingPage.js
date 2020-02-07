import React, { Component } from 'react';
import './VotingPage.css'
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'

import TanantsNavbar from '../components/TanantsNavbar';
import VotingModel from '../model/VotingModel'
import VotingCard from '../components/VotingCard';

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            votings: [],
            myopenvoting: [],
            showNewVotingModal: false

        }
        this.setVote = this.setVote.bind(this);
    }
    async componentDidMount() {
        if (this.props.activeUser) {
            const Voting = Parse.Object.extend('voting');
            const query = new Parse.Query(Voting);

            const parseVotings = await query.find();
            const votings = parseVotings.map(parseVoting => new VotingModel(parseVoting));
            this.setState({ votings });

        }
    }

    setVote(Voting) {



        const { activeUser } = this.props;
        // updating voting class in votes field
        const voting = Parse.Object.extend('voting');
        const query1 = new Parse.Query(voting);
        const myVote = { "votedBy": activeUser.id, "vote": "yes" };
        let allvotes = Voting.votes.push(myVote);


        query1.get(Voting.id).then((object) => {
            object.set('votes', Voting.votes);

            object.save().then((response) => {
                const Vote = Parse.Object.extend('Vote');
                const myNewObject = new Vote();
                const query = new Parse.Query(voting);
                myNewObject.set('votedBy', activeUser);
                myNewObject.set('vote', 'yes');
                myNewObject.set('voteId', object);

                myNewObject.save().then(
                    (result) => {
                        console.log('Vote created', result);
                    },
                    (error) => {
                        console.error('Error while creating Vote: ', error);
                    }
                );
                console.log('Updated voting', response);
            }, (error) => {
                console.error('Error while updating voting', error);
            });
        });


    }

    render() {
        const { activeUser, isCommitteeUser, handeLogout, mycommunity } = this.props;
        const { votings } = this.state;
        if (!activeUser) {
            return <Redirect to="/" />
        }
        const VotingHeader = mycommunity == null ? <h1 className="textbuild">   הצבעות  : </h1> : <h1 className="textbuild">  הצבעות   :     {mycommunity.street}  {mycommunity.bulding} {mycommunity.City}  </h1>
        const votesView = votings.map(voting =>
            <Col lg={4} md={6} key={voting.id}>
                <VotingCard voting={voting} setVote={this.setVote} />
            </Col>)
        console.log("voteview");
        console.log(votesView);


        return (
            <div className="Hebrew">
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} />
                {VotingHeader}
                {votesView}
            </div>



        );

    }
}

export default VotingPage;





