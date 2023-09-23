import { Formik } from "formik";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import * as yup from 'yup';
import { loginUser, signupUser } from "../../../service/ProfileService";
import { useHistory } from 'react-router-dom';

export default function SignUpComponent(props: {
    showSignUpModal: boolean,
    setShowSignUpModal: (val: boolean) => void,
    username: string
}) {

    const handleCloseSignUpModal = () => props.setShowSignUpModal(false);

    const history = useHistory()

    const handleLogInSubmit = async (email: string, password: string) => {
        await signupUser(props.username ? props.username : "", email, password)
            .then(async () => {
                await loginUser(props.username ? props.username : "", password)
            })
            .then(() => {
                history.push(`/${props.username}`)
            })
    }

    const signUpSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        username: yup.string().required()
    });

    return (
        <div>
            <Modal show={props.showSignUpModal} onHide={handleCloseSignUpModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={signUpSchema}
                        onSubmit={form => handleLogInSubmit(form.email, form.password)}
                        initialValues={{
                            email: "",
                            password: "",
                            username: props.username
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom02" >
                                <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='username'
                                        value={values.username}
                                        readOnly={values.username != ""}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>

                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>

                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseSignUpModal}>
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