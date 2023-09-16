import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import * as yup from 'yup';
import { loginUser, signupUser } from "../../../service/ProfileService";

export default function LoginComponent(props: {
    showLoginModal: boolean,
    setShowLoginModal: (val: boolean) => void,
}) {

    const handleCloseLoginModal = () => props.setShowLoginModal(false);

    const handleLogInSubmit = (username: string, password: string) => {
        loginUser(username ? username : "", password)
            .then(() => {
                window.location.href = `/${username}`
            })
    }

    const loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    });

    return (
        <div>
            <Modal show={props.showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={loginSchema}
                        onSubmit={form => handleLogInSubmit(form.username, form.password)}
                        initialValues={{
                            username: "",
                            password: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02" >
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder='Username'
                                            name='username'
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={!!errors.username}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>

                                        <Form.Control
                                            type="password"
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
        </div>
    )

}