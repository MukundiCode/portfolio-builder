import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Project } from "../../../types/Project";
import ProjectContainer from "./Project-container-component";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { getSkills } from "../data/skills";

function ProjectListComponent(props: {
    portfolioId: number | undefined
}) {

    const [projectList, setProjectList] = useState<Project[]>([])
    const [projectSkills, setProjectSkills] = useState<string[]>([])
    const [showProjectModal, setShowProjectModal] = useState(false);

    const [project, setProject] = useState<Project>({
        id: undefined,
        title: '',
        description: '',
        skills: []
    });

    useEffect(() => {
        axios.get('http://localhost:8080/portfolio/' + props.portfolioId + '/project/all')
            .then(response => {
                setProjectList(response.data)
            });
    }, []);

    const getProjectHandler = (name: keyof Project) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setProject({ ...project, [name]: event.target.value });
        };
    };

    const handleNewProjectSubmit = async () => {
        project.skills = projectSkills

        axios.post('http://localhost:8080/portfolio/' + props.portfolioId + '/project/add',
            project, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                setProjectList(projectList => [response.data, ...projectList])
            });

        setProject({
            id: undefined,
            title: '',
            description: '',
            skills: []
        })
        handleCloseProjectModal()
    }

    const handleDeleteProject = async (id: number | undefined) => {
        project.skills = projectSkills
        axios.delete('http://localhost:8080/portfolio/' + props.portfolioId + '/project/' + id + '/delete')
            .then(response => {
                setProjectList((prev) => [...prev.filter(item => item.id !== id)])
            });
    }


    const handleCloseProjectModal = () => setShowProjectModal(false);
    const handleShowProjectModal = () => setShowProjectModal(true);

    return (
        <div className='mt-3'>

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

            <Row>
                <Col>
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
                    </div>
                </Col>
            </Row>
            <Stack gap={3}>
                {projectList.map((project, i) => <ProjectContainer handleDelete={handleDeleteProject} key={i} project={project}></ProjectContainer>)}
            </Stack>
        </div>
    )

}

export default ProjectListComponent;