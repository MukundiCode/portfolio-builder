import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import axios from 'axios';
import { Portfolio } from '../../types/Portfolio';
import { useState } from 'react';
import { json } from 'stream/consumers';


function Profile() {

    const [portfolio , setPortfolio] = useState<Portfolio>();

    axios
    .get<Portfolio>('http://localhost:8080/portfolio')
    .then(response => {
      setPortfolio(response.data)
    });

    return (
        <div>
            <Container fluid className='w-75'>
                <Row>
                    <Col xs={5}>
                        <NameAndLinks></NameAndLinks>
                    </Col>

                    <Col>
                    <AboutAndExperience></AboutAndExperience>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
