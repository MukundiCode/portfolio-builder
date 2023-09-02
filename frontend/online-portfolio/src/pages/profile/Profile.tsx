import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import axios from 'axios';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';


function Profile() {

    const [portfolio, setPortfolio] = useState<Portfolio>({
        id: undefined,
        name: "",
        shortIntro: "",
        aboutMe: "",
        experienceList: [],
        projectList: []
    });

    const [isPortfolioReady, setIsPortfolioReady] = useState<boolean>(false)

    const params = useParams<{ username: string }>();

    useEffect(() => {
        console.log(params)
        axios.get<Person>('http://localhost:8080/' + params.username)
            .then(response => {
                setPortfolio(response.data.portfolio)
                setIsPortfolioReady(true)
            }).catch(err => console.log(err));
    }, [])

    const editAboutMe = (aboutMe: string) => {
        axios.post('http://localhost:8080/portfolio/' + portfolio.id + '/aboutMe/edit',
            aboutMe, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                setPortfolio(response.data)
            });
    }

    const editName = (name: string) => {
        axios.post('http://localhost:8080/portfolio/' + portfolio.id + '/name/edit',
            { name: name }, {
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
            {isPortfolioReady && <Container fluid className='w-75'>
                <Row>
                    <Col xs={5}>
                        <NameAndLinks
                            name={portfolio.name}
                            editName={editName}></NameAndLinks>
                    </Col>

                    <Col>
                        <AboutAndExperience
                            id={portfolio.id}
                            aboutMe={portfolio.aboutMe}
                            editAboutMe={editAboutMe}></AboutAndExperience>
                    </Col>
                </Row>
            </Container>}
        </div>
    );
}

export default Profile;
