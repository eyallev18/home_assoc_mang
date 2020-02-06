import React, { Component } from 'react';
import './MessagePage.css'
import { Form, Button, Alert, Col, Card, Row, Accordion } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import { Link, Redirect } from 'react-router-dom';
import TanantsNavbar from '../components/TanantsNavbar';
import MessageModel from '../model/MessageModel'
import NewMessageModal from '../components/NewMessageModal';
import MessageCard from '../components/MessageCard';
import Collapse from "../components/Collapse";
import { Pie } from 'react-chartjs-2';

const { Body, Header, Title } = Card;

class MessagePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            messages: [],
            showNewMessageModal: false

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);


    }
    async componentDidMount() {
        if (this.props.activeUser) {
            const Message = Parse.Object.extend('message');
            const query = new Parse.Query(Message);
            query.equalTo("community", this.props.activeUser.attributes.community);

            const parseMessages = await query.find();
            let messages = parseMessages.map(parseMessage => new MessageModel(parseMessage));
            messages.sort(function (a, b) {
                a = new Date(a.createdAt);
                b = new Date(b.createdAt);
                return a > b ? -1 : a < b ? 1 : 0;
            });
            this.setState({ messages });
            console.log(messages);
            // query.find().then((parseRecipes) => {
            //     const recipes = parseRecipes.map(parseRecipe => new RecipeModel(parseRecipe));
            //     this.setState({ recipes });
            // }, (error) => {
            //     console.error('Error while fetching Recipe', error);
            // });
        }
    }


    handleClose() {
        this.setState({
            showNewMessageModal: false
        })
    }

    handleNewMessage(newMessage) {
        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        const message = Parse.Object.extend('message');
        const newParseMessage = new message();

        newParseMessage.set('createdBy', activeUser.attributes.username);
        newParseMessage.set('title', newMessage.title);
        newParseMessage.set('details', newMessage.details);
        newParseMessage.set('priority', newMessage.priority);
        newParseMessage.set('community', activeUser.attributes.community);
        newParseMessage.set('comments', newMessage.comments);

        newParseMessage.save().then(theCreatedParseMessage => {
            console.log('Message created', theCreatedParseMessage);

            this.setState({
                messages: this.state.messages.concat(new MessageModel(theCreatedParseMessage)).sort(function (a, b) {
                    a = new Date(a.createdAt);
                    b = new Date(b.createdAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
            })
        }, error => {
            console.error('Error while creating Message: ', error);
        });
    }

    getChartData(messages) {
        let messagesData = [0, 0, 0];

        messages.forEach(message => {
            if (message.priority === 'רגילה') {
                ++messagesData[0];
            } else if (message.priority === 'גבוהה') {
                ++messagesData[1];
            } else {
                ++messagesData[2];
            }
        })


        return {
            labels: [
                'רגילה',
                'גבוהה',
                'דחופה',
            ],
            datasets: [{
                data: messagesData,
                backgroundColor: [
                    'rgb(220,220,220)',
                    'yellow',
                    'orange'
                ],

                hoverBackgroundColor: [
                    'rgb(120,120,120)',
                    'greenyellow',
                    'rgb(210,151,100)']
            }]
        };

    }


    render() {


        const { showNewMessageModal, messages } = this.state;
        const chartData = this.getChartData(messages);


        const { activeUser, isCommitteeUser, handeLogout, mycommunity } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        const messageView = messages.map(message =>
            <Col lg={12} md={12} key={message.id}>
                <MessageCard message={message} />
            </Col>)
        const MessageHeader = mycommunity == null ? <h1 className="textbuild">   הודעות בנין : </h1> : <h1 className="textbuild">  הודעות בנין :     {mycommunity.street}  {mycommunity.bulding} {mycommunity.City}  </h1>

        return (
            <div className="Hebrew">
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} changeuser={this.updateUsers} />
                {MessageHeader}


                <Button className="createb" onClick={() => { this.setState({ showNewMessageModal: true }) }}>צור הודעה חדשה</Button>
                <div className="floatchart">
                    <div style={{ width: '50%' }}>
                        <Accordion className="rightitem" defaultActiveKey="0">
                            {messageView}

                        </Accordion>
                    </div>
                    <div style={{ width: '50%' }}>
                        <Pie className="leftitem" data={chartData} />
                    </div>
                </div>
                <NewMessageModal activeUser={activeUser} isCommitteeUser={isCommitteeUser} show={showNewMessageModal} handleClose={this.handleClose} handleNewMessage={this.handleNewMessage} />
            </div>


        );

    }
}

export default MessagePage;





