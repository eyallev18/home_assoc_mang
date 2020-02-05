import React, { Component } from 'react';
import './TanantsPage.css'
import { Col, Row, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse'
import TanantsNavbar from '../components/TanantsNavbar';
import TanantsCard from '../components/TanantsCard';
import TanantsModel from '../model/TanantsModel'
import CommunityModel from '../model/CommunityModel'

import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    async componentDidMount() {

        if (this.props.activeUser) {
            const User = Parse.Object.extend('User');
            const query = new Parse.Query(User);
            query.equalTo("community", this.props.activeUser.attributes.community);

            const parseUsers = await query.find();
            const users1 = parseUsers.map(parseUser => { new TanantsModel(parseUser); this.updateUsers(parseUser); });
            const ourcomm = query._where.community.objectId;

            const Community = Parse.Object.extend('Community');
            const queryC = new Parse.Query(Community)
            queryC.equalTo("objectId", ourcomm)
            const parseCommunity = await queryC.find();

            const myCommunity = new CommunityModel(parseCommunity[0]);
            // const parsourcommunity = parseCommunity.map(parseCommunity => { new CommunityModel(parseCommunity); });

            console.log(myCommunity);
            //this.props.changeuser(parseUsers);
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
        const { users, community } = this.state;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        const usersView = users.map(user =>
            <Col lg={4} md={6} key={user.id}>
                <TanantsCard user={user} />
            </Col>)

        return (
            <div>
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} changeuser={this.updateUsers} />
                <Container>
                    <div className="users-header">
                        <h1 className="textbuild">   הדיירים של  רחוב </h1>

                    </div>
                    <Row className="padding">
                        {usersView}
                    </Row>
                    {/* <Pie data={chartData} />  */}
                </Container>



            </div>



        );

    }
}

export default TanantsPage;





