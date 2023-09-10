import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editPortfolioAboutMe, editPortfolioName, getPerson, addLink } from '../../service/ProfileService';


function Profile() {

    const [portfolio, setPortfolio] = useState<Portfolio>({
        id: undefined,
        name: "",
        shortIntro: "",
        aboutMe: "",
        experienceList: [],
        projectList: [],
        links: []
    });

    const [isPortfolioReady, setIsPortfolioReady] = useState<boolean>(false)

    const params = useParams<{ username: string }>();

    useEffect(() => {
        getPerson(params.username).then(response => {
            setPortfolio(response.data.portfolio)
            setIsPortfolioReady(true)
        }).catch(err => console.log(err));
    }, [])

    const editAboutMe = (aboutMe: string) => {
        editPortfolioAboutMe(portfolio.id, aboutMe)
            .then(response => {
                setPortfolio(response.data)
            });
    }

    const editName = (name: string) => {
        editPortfolioName(portfolio.id, name)
            .then(response => {
                setPortfolio(response.data)
            });
    }

    const handleAddLink = (link: string) => {
        addLink(portfolio.id, link)
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
                            links={portfolio.links}
                            editName={editName}
                            addLink={handleAddLink}
                            ></NameAndLinks>
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
