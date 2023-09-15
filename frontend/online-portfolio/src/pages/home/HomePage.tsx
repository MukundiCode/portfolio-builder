import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useTypewriter } from 'react-simple-typewriter';
import { getCurrentUser, loginUser, signupUser } from "../../service/ProfileService";
import { Formik } from "formik";
import * as yup from 'yup';

function HomePage() {

    const [username, setUsername] = useState<string>();
    const [textBoxPlaceHolder, setTextBoxPlaceHolder] = useTypewriter({
        words: ["yourusername"],
        loop: 0
    })
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleUsernameSubmit = () => {
        if (getCurrentUser() == null) {
            handleShowLoginModal()
        }
    }

    const handleLogInSubmit = (email: string, password: string) => {
        signupUser(username ? username : "", email, password)
        .then(async () => {
            loginUser(username ? username : "", password)
        })
        .then(() =>{
            window.location.href = `/${username}`
        })
    }

    const handleCloseLoginModal = () => setShowLoginModal(false);
    const handleShowLoginModal = () => setShowLoginModal(true);

    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    return (
        <div>

            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={loginSchema}
                        onSubmit={form => handleLogInSubmit(form.email, form.password)}
                        initialValues={{
                            email: "",
                            password: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02" >
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder='email'
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>

                                        <Form.Control
                                            type="text"
                                            placeholder='Password'
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                        
                                    </InputGroup>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseLoginModal}>
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

            <Container className="w-50 mt-5 pt-5">
                <Row>
                    <div className="display-2 mb-3 home-font text-center" >
                        Your developer portfolio is one click away!
                    </div>
                </Row>
                <Row className="d-flex justify-content-center">
                    <div className="w-75 align-middle">
                        <InputGroup className="mb-3 align-middle ">
                            <InputGroup.Text id="basic-addon3">
                                devportfolio.me/
                            </InputGroup.Text>
                            <Form.Control
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                placeholder={textBoxPlaceHolder + "|"}
                                onChange={(event) => setUsername(event.target.value)} />
                            <Button onClick={handleUsernameSubmit} variant="dark">Launch</Button>
                        </InputGroup>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;