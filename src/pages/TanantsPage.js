import React, { Component } from 'react';
import './TanantsPage.css'
import { Col, Row, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
import TanantsCard from '../components/TanantsCard';
import TanantsModel from '../model/TanantsModel'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
class TanantsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []

        };

        this.updateUsers = this.updateUsers.bind(this);
    }
    updateUsers(user) {
        this.setState({
            users: this.state.users.concat(new TanantsModel(user)),
        });
    }



    render() {
        const { activeUser, isCommitteeUser, handeLogout } = this.props;
        const { users } = this.state;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        const usersView = users.map(user =>
            <Col lg={3} md={6} key={user.id}>
                <TanantsCard user={user} />
            </Col>)

        return (
            <div>
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} changeuser={this.updateUsers} />
                <Container>
                    <div className="users-header">
                        <h1>דיירים</h1>

                    </div>
                    <Row>
                        {usersView}
                    </Row>
                    {/* <Pie data={chartData} />  */}
                </Container>

                <h1>I'm Tanants Page</h1>

            </div>



        );

    }
}

export default TanantsPage;





