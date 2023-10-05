import { ChangeEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Modal, Row, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Project } from "../../../types/Project";
import ProjectContainer from "./Project-container-component";
import { Typeahead } from "react-bootstrap-typeahead";
import { getSkills } from "../data/skills";
import { addProject, deleteProject, getAllProjects, logoutUser, shouldShowEditButtons } from "../../../service/ProfileService";
import { Formik } from "formik";
import * as yup from 'yup';
import { useHistory, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

function ProjectListComponent(props: {
    initialProjectList: Project[]
}) {

    const [projectList, setProjectList] = useState<Project[]>(props.initialProjectList)
    const [showProjectModal, setShowProjectModal] = useState(false);
    const params = useParams<{ username: string }>();
    const history = useHistory()

    const handleNewProjectSubmit = async (title: string, skills: string[], description: string) => {
        const project: Project = {
            id: undefined,
            title: title,
            description: description,
            skills: skills
        }
        addProject(project)
            .then(response => {
                console.log(response.data)
                setProjectList(projectList => [response.data, ...projectList])
                handleCloseProjectModal()
                toast.success('Project added successfuly')
            })
            .catch(err => {
                if (err.response.status === 401) {
                    logoutUser()
                    history.push("/");
                }
                toast.error('Something went wrong with your request!')
            });
    }

    const handleDeleteProject = async (projectId: number | undefined) => {
        deleteProject(projectId)
            .then(response => {
                setProjectList((prev) => [...prev.filter(item => item.id !== projectId)])
                toast.success('Experience deleted successfuly')
            })
            .catch(err => {
                // handleUnauthorizedError(err)
                console.error(err)
                toast.error('Failed to delete')
            });
    }

    const schema = yup.object().shape({
        title: yup.string().required(),
        skills: yup.array(),
        description: yup.string().required(),
    });


    const handleCloseProjectModal = () => {
        setShowProjectModal(false)
    };
    const handleShowProjectModal = () => setShowProjectModal(true);

    return (
        <div className='mt-3'>

            <Modal show={showProjectModal} onHide={handleCloseProjectModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Toaster position="top-center" richColors />
                    <Formik
                        validationSchema={schema}
                        onSubmit={form => handleNewProjectSubmit(form.title, form.skills, form.description)}
                        initialValues={{
                            title: "",
                            skills: [],
                            description: ""
                        }} >
                        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        name='title'
                                        type="text"
                                        autoFocus
                                        value={values.title}
                                        isInvalid={!!errors.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>

                                    <Form.Label>Skills</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey="skills"
                                        multiple
                                        onChange={selected => {
                                            setFieldValue('skills', selected, false)
                                        }}
                                        options={getSkills()}
                                        placeholder="Choose a skill..."
                                        selected={values.skills}
                                    />

                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea"
                                        name='description'
                                        rows={3}
                                        value={values.description}
                                        isInvalid={!!errors.description}
                                        onChange={handleChange}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseProjectModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
            </Modal>

            <Row>
                <Col>
                    <h5>
                        <Stack direction='horizontal' gap={3}>
                            <div>
                                Projects
                            </div>
                            {shouldShowEditButtons(params.username) &&
                                <Icon.PlusSquareDotted role='button' onClick={handleShowProjectModal} ></Icon.PlusSquareDotted>
                            }

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