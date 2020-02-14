import React, { Component } from 'react';
import './DashBoard.css'
import { Form, Button, Alert, Col, Container, Row } from 'react-bootstrap';
//import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
import TanantsPage from './TanantsPage';
import MessagesPage from './MessagesPage';
import VotingPage from './VotingPage';

import { Redirect } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { activeUser, committeeUser, handeLogout, mycommunity, isCommitteeUser } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }



        return (

            //             <Container>
            //   <Row className="justify-content-md-center">
            //     <Col xs lg="2">
            //       1 of 3
            //     </Col>
            //     <Col md="auto">Variable width content</Col>
            //     <Col xs lg="2">
            //       3 of 3
            //     </Col>
            //   </Row>
            //   </Container>
            <div>
                <TanantsNavbar activeUser={activeUser} committeeUser={committeeUser} handeLogout={handeLogout} />
                <Container>
                    <Row className="justify-content-md-center">
                        {/*   <div className="mycontainer" >  */}
                        <Col xs lg="4" md="4">
                            {/* <div className="rightitem scroolbar" > */}
                            <VotingPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />

                            {/*     </div> */}
                        </Col>
                        <Col xs lg="4" md="4">
                            {/*   <div className="rightitem scroolbar"> */}
                            <MessagesPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} />


                            {/*   </div> */}
                        </Col>

                        {/*  </div> */}
                    </Row>
                </Container>
            </div>



        );

    }
}

export default DashBoard;





