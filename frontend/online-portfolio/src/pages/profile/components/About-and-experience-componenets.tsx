import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import ExperienceContainer from './Experience-container-component';
import ProjectContainer from './Project-container-component';
import { Experience } from '../../../types/Experience';
import { Project } from '../../../types/Project';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getSkills } from '../data/skills';
import * as Icon from 'react-bootstrap-icons';

function AboutAndExperience(props: {
    id: number | undefined,
    expereinceList: Experience[],
    projectList: Project[],
    aboutMe: string,
    addExperienceAndUpdatePortfolio: (exp: Experience) => void,
    addProjectAndUpdatePortfolio: (proj: Project) => void,
    editAboutMe: (aboutMe: string) => void
}) {
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showAboutMeModal, setShowAboutMeModal] = useState(false);
    const [experienceSkills, setExperienceSkills] = useState<string[]>([])
    const [projectSkills, setProjectSkills] = useState<string[]>([])
    const [aboutMe, setAboutMe] = useState<string>("")
    const [experience, setExperience] = useState<Experience>({
        position: '',
        company: '',
        description: '',
        since: new Date(),
        until: new Date(),
        skills: []
    });

    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        skills: []
    });

    const getExperienceHandler = (name: keyof Experience) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setExperience({ ...experience, [name]: event.target.value });
        };
    };

    const handleNewExperienceSubmit = async () => {
        experience.skills = experienceSkills
        props.addExperienceAndUpdatePortfolio(experience)
        setExperience({
            position: '',
            company: '',
            description: '',
            since: new Date(),
            until: new Date(),
            skills: []
        })
        handleCloseExperienceModal()
    }

    const getProjectHandler = (name: keyof Project) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setProject({ ...project, [name]: event.target.value });
        };
    };

    const handleNewProjectSubmit = async () => {
        project.skills = projectSkills
        props.addProjectAndUpdatePortfolio(project)
        setProject({
            title: '',
            description: '',
            skills: []
        })
        handleCloseProjectModal()
    }

    const handleEditAboutMeSubmit = async () => {
        props.editAboutMe(aboutMe)
        handleCloseAboutMeModal()
    }

    const handleCloseExperienceModal = () => setShowExperienceModal(false);
    const handleShowExperienceModal = () => setShowExperienceModal(true);

    const handleCloseProjectModal = () => setShowProjectModal(false);
    const handleShowProjectModal = () => setShowProjectModal(true);

    const handleCloseAboutMeModal = () => setShowAboutMeModal(false);
    const handleShowAboutMeModal = () => setShowAboutMeModal(true);

    return (
        <div>
            <Modal show={showExperienceModal} onHide={handleCloseExperienceModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={getExperienceHandler('position')}
                            />

                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={getExperienceHandler('company')}
                            />
                            <Row>
                                <Col>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="date"
                                        name="dob"
                                        placeholder="Start date"
                                        onChange={getExperienceHandler('since')} />
                                </Col>
                                <Col>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="date"
                                        name="dob"
                                        placeholder="End date"
                                        onChange={getExperienceHandler('until')} />
                                </Col>

                            </Row>

                            <Form.Label>Skills</Form.Label>
                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                multiple
                                onChange={selected => {
                                    setExperienceSkills(selected.map(s => s.toString()))
                                }}
                                options={getSkills()}
                                placeholder="Choose a skill..."
                                selected={experienceSkills}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                onChange={getExperienceHandler('description')} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseExperienceModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNewExperienceSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showProjectModal} onHide={handleCloseProjectModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={getProjectHandler('title')}
                            />

                            <Form.Label>Skills</Form.Label>
                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                multiple
                                onChange={selected => {
                                    setProjectSkills(selected.map(s => s.toString()))
                                }}
                                options={getSkills()}
                                placeholder="Choose a skill..."
                                selected={projectSkills}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                onChange={getProjectHandler('description')} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProjectModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNewProjectSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAboutMeModal} onHide={handleCloseAboutMeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit About Me</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control as="textarea"
                                rows={3}
                                placeholder={props.aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAboutMeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditAboutMeSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className='d-flex justify-content-center mt-4 pt-5'>
                <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                    <div>
                        <h5>
                            <Stack direction='horizontal' gap={3}>
                                <div>
                                    About Me
                                </div>
                                <Icon.PencilFill role='button' onClick={() => handleShowAboutMeModal()}></Icon.PencilFill>
                            </Stack>
                        </h5>
                        <p>
                            {props.aboutMe}
                        </p>
                    </div>

                    <div>
                        <Row>
                            <Col>

                                <h5>
                                    <Stack direction='horizontal' gap={3}>
                                        <div>
                                            Experience
                                        </div>
                                        <Icon.PlusSquareDotted role='button' onClick={handleShowExperienceModal} ></Icon.PlusSquareDotted>
                                    </Stack>
                                </h5>


                            </Col>
                            <Col>
                                <div className='d-flex justify-content-end'>
                                    {/* <Button variant='light' className='new-section-element-button' onClick={handleShowExperienceModal}>+</Button> */}

                                </div>
                            </Col>
                        </Row>
                        <Stack gap={3}>
                            {props.expereinceList.map((experience, i) => <ExperienceContainer key={i} experience={experience} ></ExperienceContainer>)}
                        </Stack>
                    </div>

                    <div className='mt-3'>
                        <Row>
                            <Col>
                                {/* <h5>Projects</h5> */}
                                <h5>
                                    <Stack direction='horizontal' gap={3}>
                                        <div>
                                        Projects
                                        </div>
                                        <Icon.PlusSquareDotted role='button' onClick={handleShowProjectModal} ></Icon.PlusSquareDotted>
                                    </Stack>
                                </h5>
                            </Col>
                            <Col>
                                <div className='d-flex justify-content-end'>
                                    {/* <Button variant='light' className='new-section-element-button' onClick={handleShowProjectModal}>+</Button> */}
                                </div>
                            </Col>
                        </Row>
                        <Stack gap={3}>
                            {props.projectList.map((project, i) => <ProjectContainer key={i} project={project}></ProjectContainer>)}
                        </Stack>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutAndExperience;