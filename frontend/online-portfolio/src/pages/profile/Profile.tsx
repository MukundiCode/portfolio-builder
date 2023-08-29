import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import axios from 'axios';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { Experience } from '../../types/Experience';
import { Project } from '../../types/Project';


function Profile() {

    const [portfolio, setPortfolio] = useState<Portfolio>({
        id: undefined,
        name: "",
        shortIntro: "",
        aboutMe: "",
        experienceList: [],
        projectList: []
    });

    useEffect(() => {
        axios.get<Portfolio>('http://localhost:8080/portfolio/1')
            .then(response => {
                setPortfolio(response.data)
            }).catch(err => console.log(err));
    }, [])

    const addExperienceAndUpdatePortfolio = (exp: Experience) => {
        console.log(exp)
        axios.post('http://localhost:8080/portfolio/' + portfolio.id + '/experience/add',
            exp, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                setPortfolio(response.data)
            });
    }

    const addProjectAndUpdatePortfolio = (proj: Project) => {
        axios.post('http://localhost:8080/portfolio/' + portfolio.id + '/project/add',
            proj, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                setPortfolio(response.data)
            });
    }

    return (
        <div>
            <Container fluid className='w-75'>
                <Row>
                    <Col xs={5}>
                        <NameAndLinks name={portfolio.name}></NameAndLinks>
                    </Col>

                    <Col>
                        <AboutAndExperience
                            expereinceList={portfolio.experienceList}
                            projectList={portfolio.projectList}
                            id={portfolio.id}
                            addExperienceAndUpdatePortfolio={addExperienceAndUpdatePortfolio}
                            addProjectAndUpdatePortfolio={addProjectAndUpdatePortfolio}></AboutAndExperience>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
