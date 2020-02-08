import React, { Component } from 'react';
import TanantsNavbar from '../components/TanantsNavbar';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './HomePage.css'
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
        const { activeUser, isCommitteeUser } = this.props;

        return (

            <div style={{ width: '98%', margin: 'auto' }}>
                <TanantsNavbar activeUser={activeUser} isCommitteeUser={isCommitteeUser} handlelogin={this.handlelogin} handeLogout={this.handeLogout} />
                {/* <RecipeNavbar activeUser={activeUser} handleLogout={handleLogout} />*/}
                <Carousel className={"posfix"} customTransition="transform 300ms ease-in-out" swipeable={true} responsive={responsive} stopOnHover={false} arrows={false} showStatus={false} showIndicators={false} showDots={false} showThumbs={false} autoPlay={true} interval="5000" infinite={true} >
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

                <div className="backpic">


                    <Jumbotron>
                        <h4 className="headerbuild">   ברוכים הבאים לניהול ועד הבית שלי </h4>
                        <h5 className="headerbuild">     האפליקציה שתעזור לכם לחיי קהילה טובים ושכנות טובה</h5>
                        <footer className="footerline">
                            <h6 className="headerbuild">   נכתב ועוצב על ידי: אייל לב<br /><a href="mailto:eyal18yaffa03@gmail.com">eyal18yaffa03@gmail.com</a></h6>
                        </footer>


                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default HomePage;