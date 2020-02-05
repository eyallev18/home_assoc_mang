import React, { Component } from 'react';
import './TanantsCard.css'
import { Card } from 'react-bootstrap';

class TanantsCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { user } = this.props;

        return (
            <div className="user">



                <Card border="primary" style={{ width: '18rem' }}>
                    <Card.Header style={{ margin: 'auto', fontWeight: 'bold', backgroundColor: 'cyan', textDecoration: 'underline' }}>   משפחת : {user.lname} </Card.Header>
                    <Card.Body>
                        <Card.Title> {user.backupemail} : אימייל </Card.Title>
                        <Card.Text>
                            {user.apartment} : דירה מספר
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default TanantsCard;