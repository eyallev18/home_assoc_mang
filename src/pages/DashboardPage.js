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
        const { activeUser, committeeUser, handeLogout, mycommunity, isCommitteeUser, handleGetCommunity } = this.props;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        const DashBoardHeader = mycommunity == null ? <h1 className="textbuild">   תצוגות  : </h1> : <h1 className="textbuild">  תצוגות   :     {mycommunity.street}  {mycommunity.bulding} {mycommunity.City}  </h1>

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
                {/*<Container>*/}
                {DashBoardHeader}
                <Row className="justify-content-md-center">
                    {/* <div className="mycontainer" > */}

                    <Col xs lg="7" md="12">
                        <div className="rightitem scroolbar" >
                            <VotingPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} handleGetCommunity={handleGetCommunity} />

                        </div>
                    </Col>
                    <Col xs lg="5" md="12">
                        <div className="rightitem scroolbar">
                            <MessagesPage activeUser={activeUser} handeLogout={this.handeLogout} isCommitteeUser={isCommitteeUser} mycommunity={mycommunity} handleGetCommunity={handleGetCommunity} />


                        </div>
                    </Col>

                    {/*   </div> */}
                </Row>
                {/*  </Container> */}
            </div>



        );

    }
}

export default DashBoard;





