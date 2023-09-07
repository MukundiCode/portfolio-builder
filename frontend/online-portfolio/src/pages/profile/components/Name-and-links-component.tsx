import { Button, Form, InputGroup, Modal, Stack } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

function NameAndLinks(props: {
    name: string,
    editName: (name: string) => void
}) {

    const [showEditNameModal, setShowEditNameModal] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required(),
    });

    const handleEditAboutMeSubmit = (name: string) => {
            props.editName(name)
            handleCloseEditNameModal()
    }

    const handleCloseEditNameModal = () => setShowEditNameModal(false);
    const handleShowEditNameModal = () => setShowEditNameModal(true);

    return (

        <div className='sticky-top d-flex justify-content-center mt-4 pt-5 '>
            <Modal show={showEditNameModal} onHide={handleCloseEditNameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={schema}
                        onSubmit={e => handleEditAboutMeSubmit(e.name)}
                        initialValues={{
                            name: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02" >
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder='Name'
                                            name='name'
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditNameModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>

            </Modal>

            <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                <h5>
                    Hie There, I am
                </h5>
                <Stack direction='horizontal' gap={3}>
                    <div className="display-2 mb-3 name-font" >
                        {props.name ? props.name : "Name"}
                    </div>
                    <Icon.PencilFill role='button' onClick={handleShowEditNameModal}></Icon.PencilFill>
                </Stack>

                <div className='mb-3'>
                    Professional Software Developer with a passion for delivering reliable software solutions
                </div>

                <div>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="dark">
                            Hire Me
                        </Button>
                        <Button variant="dark">
                            CV
                        </Button>
                    </Stack>
                </div>

                <div className='mt-3 pt-3'>
                    <Stack direction="horizontal" gap={2}>
                        <SocialIcon url="https://twitter.com/" bgColor="black" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://www.linkedin.com/in/tinashe-mukundi-chitamba-1843391a7/" bgColor="black" style={{ height: 40, width: 40 }} />
                        <SocialIcon url="https://github.com/MukundiCode" bgColor="black" style={{ height: 40, width: 40 }} />
                    </Stack>
                </div>

            </div>
        </div>
    )
}

export default NameAndLinks;