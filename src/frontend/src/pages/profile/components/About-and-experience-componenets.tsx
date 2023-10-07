import { Button, Stack, Modal, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import * as Icon from 'react-bootstrap-icons';
import ExperienceListComponent from './Experience-component';
import ProjectListComponent from './Project-component';
import { useHistory, useParams } from 'react-router-dom';
import { editPortfolioAboutMe, logoutUser, shouldShowEditButtons } from '../../../service/ProfileService';
import { Experience } from '../../../types/Experience';
import { Project } from '../../../types/Project';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { Formik } from 'formik';

function AboutAndExperience(props: {
    aboutMe: string,
    experienceList: Experience[],
    projectList: Project[],
}) {
    const [showAboutMeModal, setShowAboutMeModal] = useState(false);

    const [aboutMe, setAboutMe] = useState<string>(props.aboutMe)

    const params = useParams<{ username: string }>();

    const history = useHistory()

    const editAboutSchema = yup.object().shape({
        about: yup.string().required(),
    });

    const handleEditAboutMeSubmit = (aboutMe: string) => {
        editPortfolioAboutMe(aboutMe)
            .then(response => {
                setAboutMe(response.data)
                toast.success('Edited successfully')
            })
            .catch(err => {
                if (err.response.status === 401) {
                    logoutUser()
                    history.push("/");
                }
                toast.error('Something went wrong with your request!')
            });
        handleCloseAboutMeModal()
    }

    const handleCloseAboutMeModal = () => setShowAboutMeModal(false);
    const handleShowAboutMeModal = () => setShowAboutMeModal(true);

    return (
        <div>
            <Modal show={showAboutMeModal} onHide={handleCloseAboutMeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit About Me</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Toaster position="top-center" richColors />
                    <Formik
                        validationSchema={editAboutSchema}
                        onSubmit={e => handleEditAboutMeSubmit(e.about)}
                        initialValues={{
                            about: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <InputGroup hasValidation>
                                        <Form.Control as="textarea"
                                            type="text"
                                            placeholder='About'
                                            name='about'
                                            value={values.about}
                                            onChange={handleChange}
                                            isInvalid={!!errors.about}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.about}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseAboutMeModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <div className='d-flex justify-content-center mt-2 pt-5'>
                <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                    <div>
                        <h5>
                            <Stack direction='horizontal' gap={3}>
                                <div>
                                    About Me
                                </div>
                                {shouldShowEditButtons(params.username) &&
                                    <Icon.PencilFill size={16} role='button' onClick={() => handleShowAboutMeModal()}></Icon.PencilFill>
                                }

                            </Stack>
                        </h5>
                        <p className="text-break">
                            {aboutMe}
                        </p>
                    </div>

                    <ExperienceListComponent initialExperienceList={props.experienceList}></ExperienceListComponent>

                    <ProjectListComponent initialProjectList={props.projectList}></ProjectListComponent>

                </div>
            </div>
        </div>
    )
}

export default AboutAndExperience;