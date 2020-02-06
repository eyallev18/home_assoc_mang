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
            // console.log(votings);
            // query.find().then((parseRecipes) => {
            //     const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
            //     this.setState({ recipes });
            // }, (error) => {
            //     console.error('Error while fetching Recipe', error);
            // });
        }
    }

    setVote(Voting) {
        const voting = Parse.Object.extend('voting');
        const query1 = new Parse.Query(voting);
        console.log(query1)
        const { activeUser } = this.props;
        const Vote = Parse.Object.extend('Vote');
        const myNewObject = new Vote();
        const query = new Parse.Query(voting);

        myNewObject.set('votedBy', activeUser);
        myNewObject.set('vote', 'yes');
        myNewObject.set('voteId', Voting.id);

        myNewObject.save().then(
            (result) => {

                console.log('Vote created', result);
            },
            (error) => {

                console.error('Error while creating Vote: ', error);
            }
        );


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





