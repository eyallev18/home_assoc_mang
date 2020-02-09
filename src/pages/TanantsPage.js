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

            this.props.handleGetCommunity(myCommunity);

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
        const { activeUser, isCommitteeUser, handeLogout, mycommunity } = this.props;
        const { users, community } = this.state;
        console.log(community);
        if (!activeUser) {
            return <Redirect to="/" />
        }
        var objToday = new Date(),

            curHour = objToday.getHours();
        let welcome = <h1></h1>;
        if (curHour > 4 && curHour < 11) {
            welcome = <h1 className="textbuild"> בוקר טוב :{activeUser.attributes.username}    </h1>
        } else if (curHour > 11 && curHour < 16) {
            welcome = <h1 className="textbuild"> צהריים טובים :{activeUser.attributes.username}    </h1>
        } else if (curHour > 16 && curHour < 18) {
            welcome = <h1 className="textbuild"> אחר הצהריים טובים : {activeUser.attributes.username}    </h1>

        } else if (curHour > 18 && curHour < 21) {
            welcome = <h1 className="textbuild"> ערב טוב : {activeUser.attributes.username}    </h1>

        } else {
            welcome = <h1 className="textbuild"> לילה טוב :{activeUser.attributes.username}    </h1>

        }

        const usersView = users.map(user =>
            <Col lg={4} md={6} key={user.id}>
                <TanantsCard user={user} />
            </Col>)
        const TanantsHeader = mycommunity == null ? <h1 className="textbuild">    </h1> : <h1 className="textbuild">      {mycommunity.street}  {mycommunity.bulding} {mycommunity.City}  </h1>
        const navbarHideShow = window.location.hash === "#/dashboard" ? null : <TanantsNavbar className={"posfix"} activeUser={activeUser} isCommitteeUser={isCommitteeUser} handeLogout={handeLogout} changeuser={this.updateUsers} />
        return (
            <div>
                {navbarHideShow}
                <Container>
                    <div className="users-header">

                        {TanantsHeader}
                        {welcome}

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





