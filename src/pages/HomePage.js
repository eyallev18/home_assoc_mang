import React, { Component } from 'react';
import TanantsNavbar from '../components/TanantsNavbar';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};


class HomePage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        //const { activeUser, handleLogout } = this.props;
        const { activeUser, committeeUser } = this.props;

        return (

            <div style={{ width: '98%', margin: 'auto' }}>
                <TanantsNavbar activeUser={activeUser} committeeUser={committeeUser} handlelogin={this.handlelogin} handeLogout={this.handeLogout} />
                {/* <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />*/}
                <Carousel customTransition="transform 300ms ease-in-out" swipeable={true} responsive={responsive} stopOnHover={false} arrows={false} showStatus={false} showIndicators={false} showDots={false} showThumbs={false} autoPlay={true} interval="5000" infinite={true} >
                    <div>
                        <img src="Byte2.jpg" />
                    </div>
                    <div>
                        <img src="Byte3.jpg" />
                    </div>
                    <div>
                        <img src="Byte4.jpg" />
                    </div>
                    <div>
                        <img src="home.jpg" />
                    </div>
                    <div>
                        <img src="commonhome.jpg" />
                    </div>
                </Carousel>


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