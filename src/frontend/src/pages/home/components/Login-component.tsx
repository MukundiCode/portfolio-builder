import { Formik } from "formik";
import { useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import * as yup from 'yup';
import { loginUser, signupUser } from "../../../service/ProfileService";
import { useHistory } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function LoginComponent(props: {
    showLoginModal: boolean,
    setShowLoginModal: (val: boolean) => void,
}) {

    const handleCloseLoginModal = () => {
        props.setShowLoginModal(false)
    };

    const history = useHistory()

    const handleLogInSubmit = async (username: string, password: string) => {
        await loginUser(username ? username : "", password)
            .then(() => {
                handleCloseLoginModal()
                history.push(`/${username}`)
            })
            .catch((error) => {
                console.log(error)
                toast.error('Authentication failed')
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
                    <div>
                        <Toaster position="top-center" richColors />
                    </div>
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
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='username'
                                        value={values.username}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>

                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                    {/* <Button>Log in with GitHub</Button> */}
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseLoginModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                        Submit
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