import React, { Component } from 'react';
import './VotingPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'

import TanantsNavbar from '../components/TanantsNavbar';
import VotingModel from '../model/VotingModel'

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            votings: [],
            myopenvoting: [],
            showNewVotingModal: false

        }

    }
    async componentDidMount() {
        if (this.props.activeUser) {
            const Voting = Parse.Object.extend('voting');
            const query = new Parse.Query(Voting);

            const parseVotings = await query.find();
            const votings = parseVotings.map(parseVoting => new VotingModel(parseVoting));
            this.setState({ votings });
            console.log(votings);
            // query.find().then((parseRecipes) => {
            //     const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
            //     this.setState({ recipes });
            // }, (error) => {
            //     console.error('Error while fetching Recipe', error);
            // });
        }
    }

    render() {
        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} />
                <h1>I'm Voting Page</h1>

            </div>



        );

    }
}

export default VotingPage;





