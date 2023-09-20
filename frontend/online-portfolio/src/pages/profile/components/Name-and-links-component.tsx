import { Button, Col, Container, Form, InputGroup, Modal, Row, Stack } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

function NameAndLinks(props: {
    name: string,
    links: string[],
    editName: (name: string) => void
    addLink: (link: string) => void
}) {

    const [showEditNameModal, setShowEditNameModal] = useState(false);

    const [showEditLinksModal, setShowEditLinksModal] = useState(false);

    const editNameSchema = yup.object().shape({
        name: yup.string().required(),
    });

    const editLinksSchema = yup.object().shape({
        link: yup.string().required(),
    });

    const handleEditAboutMeSubmit = (name: string) => {
        props.editName(name)
        handleCloseEditNameModal()
    }

    const handleEditLinksSubmit = (link: string) => {
        console.log("adding")
        props.addLink(link)
        handleCloseEditLinksModal()
    }

    const handleCloseEditNameModal = () => setShowEditNameModal(false);
    const handleShowEditNameModal = () => setShowEditNameModal(true);

    const handleCloseEditLinksModal = () => setShowEditLinksModal(false);
    const handleShowEditLinksModal = () => setShowEditLinksModal(true);

    return (

        <div className='sticky-top d-flex justify-content-center mt-2 pt-5 '>
            <Modal show={showEditNameModal} onHide={handleCloseEditNameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={editNameSchema}
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

            <Modal show={showEditLinksModal} onHide={handleCloseEditLinksModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={editLinksSchema}
                        onSubmit={e => handleEditLinksSubmit(e.link)}
                        initialValues={{
                            link: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02" >
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            // placeholder='Name'
                                            name='link'
                                            value={values.link}
                                            onChange={handleChange}
                                            isInvalid={!!errors.link}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.link}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditLinksModal}>
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
                <Container>
                    <Row>
                        <h5>
                            Hie There, I am
                        </h5>
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <div className="display-2 mb-3 custom-primary name-font" >
                                {props.name ? props.name : "Name"}
                            </div>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Icon.PencilFill role='button' onClick={handleShowEditNameModal}></Icon.PencilFill>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            <Stack direction="horizontal" gap={2}>
                                <Button className='custom-primary-btn' disabled>
                                    Contact
                                </Button>
                                <Button className='custom-primary-btn' disabled>
                                    CV
                                </Button>
                            </Stack>
                        </div>
                    </Row>
                    <Row>
                        <div className='mt-3 pt-3'>
                            <Stack direction="horizontal" gap={2}>
                                {
                                    props.links.map((e, i) => {
                                        return <SocialIcon key={i} url={e} bgColor="#caced2" style={{ height: 30, width: 30 }} />
                                    })
                                }
                                { props.links.length == 0 && <div>Links</div> }
                                <Icon.PencilFill role='button' onClick={handleShowEditLinksModal}></Icon.PencilFill>
                            </Stack>
                        </div>
                    </Row>
                </Container>
                {/* <Stack direction='horizontal' gap={3}>
                    <div className="display-2 mb-3 name-font" >
                        {props.name ? props.name : "Name"}
                    </div>
                    <Icon.PencilFill role='button' onClick={handleShowEditNameModal}></Icon.PencilFill>
                </Stack> */}

                {/* <div className='mb-3'>
                    Professional Software Developer with a passion for delivering reliable software solutions
                </div> */}

            </div>
        </div>
    )
}

export default NameAndLinks;