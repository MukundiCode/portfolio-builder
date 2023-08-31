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
import ExperienceListComponent from './Experience-component';

function AboutAndExperience(props: {
    id: number | undefined,
    expereinceList: Experience[],
    projectList: Project[],
    aboutMe: string,
    addExperienceAndUpdatePortfolio: (exp: Experience) => void,
    addProjectAndUpdatePortfolio: (proj: Project) => void,
    editAboutMe: (aboutMe: string) => void
}) {
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showAboutMeModal, setShowAboutMeModal] = useState(false);
    const [projectSkills, setProjectSkills] = useState<string[]>([])
    const [aboutMe, setAboutMe] = useState<string>("")

    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        skills: []
    });

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

    const handleCloseProjectModal = () => setShowProjectModal(false);
    const handleShowProjectModal = () => setShowProjectModal(true);

    const handleCloseAboutMeModal = () => setShowAboutMeModal(false);
    const handleShowAboutMeModal = () => setShowAboutMeModal(true);

    return (
        <div>
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

                    <ExperienceListComponent portfolioId={props.id}></ExperienceListComponent>

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