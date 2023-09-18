import { Col, Container, Row, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editPortfolioAboutMe, editPortfolioName, getPerson, addLink, handleUnauthorizedError } from '../../service/ProfileService';
import { useMediaQuery } from 'react-responsive';


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

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    const params = useParams<{ username: string }>();

    useEffect(() => {
        getPerson(params.username).then(response => {
            console.log(response.data)
            setPortfolio(response.data.portfolio)
            setIsPortfolioReady(true)
        })
            .catch(err => {
                handleUnauthorizedError(err)
                console.log(err)
            });
    }, [])

    const editAboutMe = (aboutMe: string) => {
        editPortfolioAboutMe(aboutMe)
            .then(response => {
                setPortfolio(response.data)
            })
            .catch(err => {
                handleUnauthorizedError(err)
                console.log(err)
            });
    }

    const editName = (name: string) => {
        editPortfolioName(name)
            .then(response => {
                setPortfolio(response.data)
            })
            .catch(err => {
                handleUnauthorizedError(err)
                console.log(err)
            });
    }

    const handleAddLink = (link: string) => {
        addLink(link)
            .then(response => {
                setPortfolio(response.data)
            })
            .catch(err => {
                handleUnauthorizedError(err)
                console.log(err)
            });
    }

    return (
        <div>
            {isPortfolioReady &&

                (isDesktopOrLaptop &&
                    <Container fluid className='w-75'>
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
                                    aboutMe={portfolio.aboutMe}
                                    editAboutMe={editAboutMe}></AboutAndExperience>
                            </Col>
                        </Row>
                    </Container>)

                ||

                (isTabletOrMobile &&
                    <Container fluid className='w-100'>
                        <Stack gap={2}>
                            <NameAndLinks
                                name={portfolio.name}
                                links={portfolio.links}
                                editName={editName}
                                addLink={handleAddLink}
                            ></NameAndLinks>

                            <AboutAndExperience
                                aboutMe={portfolio.aboutMe}
                                editAboutMe={editAboutMe}></AboutAndExperience>

                        </Stack>
                    </Container>)
            }
        </div>
    );
}

export default Profile;
