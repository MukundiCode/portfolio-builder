import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import axios from 'axios';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';


function Profile() {

    const [portfolio, setPortfolio] = useState<Portfolio>({
        uuid: "",
        name: "",
        shortIntro: "",
        aboutMe: "",
        experienceList: [],
        projectList: []
    });

    useEffect(() => {
        axios.get<Portfolio>('http://localhost:8080/portfolio')
            .then(response => {
                setPortfolio(response.data)
            });
    }, [])

    return (
        <div>
            <Container fluid className='w-75'>
                <Row>
                    <Col xs={5}>
                        <NameAndLinks name={portfolio.name}></NameAndLinks>
                    </Col>

                    <Col>
                        <AboutAndExperience expereinceList={portfolio.experienceList} projectList={portfolio.projectList}></AboutAndExperience>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
