import { Button, Stack, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import * as Icon from 'react-bootstrap-icons';
import ExperienceListComponent from './Experience-component';
import ProjectListComponent from './Project-component';

function AboutAndExperience(props: {
    aboutMe: string,
    editAboutMe: (aboutMe: string) => void
}) {
    const [showAboutMeModal, setShowAboutMeModal] = useState(false);
    const [aboutMe, setAboutMe] = useState<string>("")

    const handleEditAboutMeSubmit = async () => {
        props.editAboutMe(aboutMe)
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
                                <Icon.PencilFill size={16} role='button' onClick={() => handleShowAboutMeModal()}></Icon.PencilFill>
                            </Stack>
                        </h5>
                        <p className="text-break">
                            {props.aboutMe}
                        </p>
                    </div>

                    <ExperienceListComponent></ExperienceListComponent>

                    <ProjectListComponent></ProjectListComponent>

                </div>
            </div>
        </div>
    )
}

export default AboutAndExperience;