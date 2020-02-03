import React, { Component } from 'react';
import './MessagePage.css'
import { Form, Button, Alert } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import { Link, Redirect } from 'react-router-dom';
import TanantsNavbar from '../components/TanantsNavbar';
import MessageModel from '../model/MessageModel'
import NewMessageModal from '../components/NewMessageModal';

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
            const messages = parseMessages.map(parseMessage => new MessageModel(parseMessage));
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
                messages: this.state.messages.concat(new MessageModel(theCreatedParseMessage))
            })
        }, error => {
            console.error('Error while creating Message: ', error);
        });
    }

    render() {
        const { showNewMessageModal } = this.state;

        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }


        return (
            <div className="Hebrew">
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} />
                <h1>I'm Message Page</h1>
                <Button onClick={() => { this.setState({ showNewMessageModal: true }) }}>צור הודעה חדשה</Button>


                <NewMessageModal activeUser={activeUser} isCommitteeUser={isCommitteeUser} show={showNewMessageModal} handleClose={this.handleClose} handleNewMessage={this.handleNewMessage} />
            </div>


        );

    }
}

export default MessagePage;





