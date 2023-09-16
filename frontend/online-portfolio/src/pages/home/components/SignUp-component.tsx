import { Formik } from "formik";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import * as yup from 'yup';
import { loginUser, signupUser } from "../../../service/ProfileService";

export default function SignUpComponent(props: {
    showSignUpModal: boolean,
    setShowSignUpModal: (val: boolean) => void,
    username: string
}) {

    const handleCloseSignUpModal = () => props.setShowSignUpModal(false);

    const handleLogInSubmit = async (email: string, password: string) => {
        await signupUser(props.username ? props.username : "", email, password)
            .then(async () => {
                await loginUser(props.username ? props.username : "", password)
            })
            .then(() => {
                window.location.href = `/${props.username}`
            })
    }

    const signUpSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    return (
        <div>
            <Modal show={props.showSignUpModal} onHide={handleCloseSignUpModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        validationSchema={signUpSchema}
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
                                    <Button variant="secondary" onClick={handleCloseSignUpModal}>
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