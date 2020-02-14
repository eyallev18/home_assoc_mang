import React, { Component } from 'react';
import './VotingPage.css'
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import NewVotingModal from '../components/NewVotingModal';
import TanantsNavbar from '../components/TanantsNavbar';
import VotingModel from '../model/VotingModel'
import TanantsModel from '../model/TanantsModel'
import CommunityModel from '../model/CommunityModel'
import VoteModel from '../model/VoteModel'
import VotingCard from '../components/VotingCard';
import { Pie } from 'react-chartjs-2';

class VotingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            votings: [],
            myvoting: [],
            showNewVotingModal: false,
            alreadyVote: []

        }
        this.setVote = this.setVote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNewVoting = this.handleNewVoting.bind(this);

    }
    async componentDidMount() {
        if (this.props.activeUser) {

            const User = Parse.Object.extend('User');
            const queryU = new Parse.Query(User);
            queryU.equalTo("community", this.props.activeUser.attributes.community);

            const parseUsers = await queryU.find();
            //           const users1 = parseUsers.map(parseUser => { new TanantsModel(parseUser); this.updateUsers(parseUser); });
            const ourcomm = queryU._where.community.objectId;

            const Community = Parse.Object.extend('Community');
            const queryC = new Parse.Query(Community)
            queryC.equalTo("objectId", ourcomm)
            const parseCommunity = await queryC.find();

            const myCommunity = new CommunityModel(parseCommunity[0]);
            // const parsourcommunity = parseCommunity.map(parseCommunity => { new CommunityModel(parseCommunity); });

            this.props.handleGetCommunity(myCommunity);










            const Voting = Parse.Object.extend('voting');
            const query = new Parse.Query(Voting);
            query.equalTo("community", this.props.activeUser.attributes.community);
            const parseVotings = await query.find();
            let votings = parseVotings.map(parseVoting => new VotingModel(parseVoting));
            votings.sort(function (a, b) {
                a = new Date(a.createdAt);
                b = new Date(b.createdAt);
                return a > b ? -1 : a < b ? 1 : 0;
            });
            this.setState({ votings });
            // if ( Voting.votes.find(({ votedBy }) => votedBy === activeUser.id) == undefined)
            const Votes = Parse.Object.extend('Vote');
            const query1 = new Parse.Query(Votes);
            query1.equalTo("votedBy", this.props.activeUser)

            const parseVotes = await query1.find();
            const myvoting = parseVotes.map(parseVote => new VoteModel(parseVote));
            this.setState({ myvoting });
        }
    }
    handleClose() {
        this.setState({
            showNewVotingModal: false
        })
    }
    handleNewVoting(newVoting) {
        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        const voting = Parse.Object.extend('voting');
        const myNewObject = new voting();

        myNewObject.set('createdBy', activeUser);
        myNewObject.set('community', activeUser.attributes.community);
        myNewObject.set('title', newVoting.title);
        myNewObject.set('details', newVoting.details);
        myNewObject.set('dueDate', newVoting.dueDate);
        myNewObject.set('votes', newVoting.votes);
        myNewObject.set('options', newVoting.options);


        myNewObject.save().then(
            (result) => {
                //  if (typeof document !== 'undefined') document.write(`voting created: ${JSON.stringify(result)}`);
                console.log('voting created', result);
                this.setState({
                    votings: this.state.votings.concat(new VotingModel(result)).sort(function (a, b) {
                        a = new Date(a.createdAt);
                        b = new Date(b.createdAt);
                        return a > b ? -1 : a < b ? 1 : 0;
                    })
                })
            },
            (error) => {
                //     if (typeof document !== 'undefined') document.write(`Error while creating voting: ${JSON.stringify(error)}`);
                console.error('Error while creating voting: ', error);
            }
        );
    }
    setVote(Voting, oneoption) {
        const { activeUser } = this.props;
        const { alreadyVote } = this.state;

        //  if ( Voting.votes.find(({ votedBy }) => votedBy === activeUser.id) == undefined){

        // updating voting class in votes field
        const voting = Parse.Object.extend('voting');
        const query1 = new Parse.Query(voting);
        const myVote = { "votedBy": activeUser.id, "vote": oneoption };
        let allvotes = Voting.votes.push(myVote);


        query1.get(Voting.id).then((object) => {
            object.set('votes', Voting.votes);

            object.save().then((response) => {
                const Vote = Parse.Object.extend('Vote');
                const myNewObject = new Vote();
                const query = new Parse.Query(voting);
                myNewObject.set('votedBy', activeUser);
                myNewObject.set('vote', oneoption);
                myNewObject.set('voteId', object);

                myNewObject.save().then(
                    (result) => {
                        console.log('Vote created', result);
                        this.setState({ myvoting: this.state.myvoting.concat(new VoteModel(result)) });
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

    getChartData(voting) {
        let votingsData = [0, 0, 0];




        for (var j = 0; j < voting.votes.length; j++) {
            if (voting.votes[j].vote === 'בעד') {
                ++votingsData[0];
            } else if (voting.votes[j].vote === 'נגד') {
                ++votingsData[1];
            } else {
                ++votingsData[2];
            }
        }



        return {
            labels: [
                'בעד',
                'נגד',
                'נמנעים',
            ],
            datasets: [{
                data: votingsData,
                backgroundColor: [
                    'green',
                    'red',
                    'gray'
                ],

                hoverBackgroundColor: [
                    'green',
                    'red',
                    'gray']
            }]
        };

    }



    render() {
        const { activeUser, isCommitteeUser, handeLogout, mycommunity } = this.props;
        const { votings, alreadyVote, myvoting, showNewVotingModal } = this.state;
        var chartData = [];
        for (let i = 0; i < votings.length; i++) {
            chartData.push(this.getChartData(votings[i]));
            //chartData = votings.length > 0 ? this.getChartData(votings) : null;

        }

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const VotingHeader = mycommunity == null ? <h1 className="textbuild">   הצבעות  : </h1> : <h1 className="textbuild">  הצבעות   :     {mycommunity.street}  {mycommunity.bulding} {mycommunity.City}  </h1>
        const votesView = votings.length > 0 ? votings.map((voting, index) =>
            <Col lg={12} md={12} key={voting.id}>
                <div className="container d-flex center users-header ">
                    <div className="rightitem">
                        <VotingCard voting={voting} setVote={this.setVote} alreadyVote={alreadyVote[index]} myvoting={myvoting} />
                    </div>
                    <div className="rightitem">
                        <Pie data={chartData[index]} />
                    </div>
                </div>
            </Col>) : votings.map((voting, index) =>
                <Col lg={6} md={6} key={voting.id}>
                    <div className="container flex center">
                        <VotingCard voting={voting} setVote={this.setVote} alreadyVote={alreadyVote[index]} myvoting={myvoting} />
                    </div>
                </Col>)
        console.log("voteview");
        console.log(votesView);
        const votingButton = isCommitteeUser ? (<Button className="createb" onClick={() => { this.setState({ showNewVotingModal: true }) }}>צור הצבעה חדשה</Button>) : (<Button className="createb" disabled onClick={() => { this.setState({ showNewVotingModal: true }) }}>צור הצבעה חדשה</Button>)

        const navbarHideShow = window.location.hash === "#/dashboard" ? null : <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} />

        return (
            <div className="Hebrew">
                {/*<TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} /> */}
                {navbarHideShow}
                {VotingHeader}
                {votingButton}
                {votesView}

                <NewVotingModal activeUser={activeUser} isCommitteeUser={isCommitteeUser} show={showNewVotingModal} handleClose={this.handleClose} handleNewVoting={this.handleNewVoting} />
            </div>



        );

    }
}

export default VotingPage;





