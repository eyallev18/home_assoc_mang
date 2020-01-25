import React, { Component } from 'react';
//import RecipeNavbar from '../components/RecipeNavbar';
import { Jumbotron } from 'react-bootstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        //const { activeUser, handleLogout } = this.props;

        return (
            <div>
                {/* <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />*/}
                <Jumbotron>
                    <h1>HomePage</h1>
                    {/*<p>
                        Master your recipes
                    </p>
                    <p>
                        <Button variant="success" href="#/login">Login</Button>
                    </p> */}
                </Jumbotron>
            </div>
        );
    }
}

export default HomePage;