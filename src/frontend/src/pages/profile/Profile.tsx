import { Alert, Col, Container, Row, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';
import { Portfolio } from '../../types/Portfolio';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editPortfolioAboutMe, editPortfolioName, getPerson, addLink, handleUnauthorizedError, logoutUser } from '../../service/ProfileService';
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
    const [shouldShowError, setShouldShowError] = useState(false)
    const history = useHistory()

    const params = useParams<{ username: string }>();

    useEffect(() => {
        getPerson(params.username)
            .then(response => {
                console.log(response.data)
                setPortfolio(response.data.portfolio)
                setIsPortfolioReady(true)
            })
            .catch(err => {
                if (err.response.status === 401){
                    logoutUser()
                    history.push("/");
                }
                setShouldShowError(true)
            });
    }, [])

    const handleAddLink = (link: string) => {
        addLink(link)
            .then(response => {
                setPortfolio(response.data)
            })
            .catch(err => {
                if (err.response.status === 401){
                    logoutUser()
                    history.push("/");
                }
                setShouldShowError(true)
            });
    }

    return (
        <div>
            {
                shouldShowError && 
                <Container className='w-50'>
                    <Alert variant="danger" onClose={() => setShouldShowError(false)} dismissible>
                        Something went wrong with your request!
                    </Alert>
                </Container>
            }
            {isPortfolioReady &&

                (isDesktopOrLaptop ?
                    <Container fluid className='w-75'>
                        <Row>
                            <Col xs={5}>
                                <div className='sticky-top'>
                                    <NameAndLinks
                                        name={portfolio.name}
                                        links={portfolio.links}
                                        addLink={handleAddLink}
                                    ></NameAndLinks>
                                </div>
                            </Col>

                            <Col>
                                <AboutAndExperience
                                    aboutMe={portfolio.aboutMe}
                                    experienceList={portfolio.experienceList}
                                    projectList={portfolio.projectList}
                                    ></AboutAndExperience>
                            </Col>
                        </Row>
                    </Container>

                    :

                    <Container fluid className='w-100'>
                        <Stack gap={2}>
                            <NameAndLinks
                                name={portfolio.name}
                                links={portfolio.links}
                                addLink={handleAddLink}
                            ></NameAndLinks>

                            <AboutAndExperience
                                aboutMe={portfolio.aboutMe}
                                experienceList={portfolio.experienceList}
                                projectList={portfolio.projectList}
                                ></AboutAndExperience>

                        </Stack>
                    </Container>
                )
            }
        </div>
    );
}

export default Profile;
