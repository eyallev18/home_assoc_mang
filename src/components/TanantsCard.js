import React, { Component } from 'react';
import './TanantsCard.css'
import { Card } from 'react-bootstrap';

class TanantsCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { user } = this.props;
        const cardstyle = user.isCommitteeMember ? { width: '18rem', backgroundColor: 'hsl(207, 48%, 85%)', marginBottom: '15px' } : { width: '18rem', backgroundColor: '#e9ecef', marginBottom: '15px' };
        const status = user.isCommitteeMember ? " ועד הבית" : "דיירים";
        const emaliladd = "mailto:" + user.backupemail;
        return (
            <div className="user">



                <Card border="primary" style={cardstyle}>
                    <Card.Header style={{ margin: 'auto', fontWeight: 'bold', textDecoration: 'underline' }}> {status} <br /> משפחת : {user.lname} </Card.Header>
                    <Card.Body>
                        <Card.Title> : אימייל<br /><a href={emaliladd} > {user.backupemail}</a> </Card.Title>

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