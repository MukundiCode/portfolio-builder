import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useTypewriter } from 'react-simple-typewriter';
import { getCurrentUser, loginUser, signupUser, isUsernameTaken, logoutUser } from "../../service/ProfileService";
import SignUpComponent from "./components/SignUp-component";
import LoginComponent from "./components/Login-component";

function HomePage() {

    const [username, setUsername] = useState<string>("");
    const [textBoxPlaceHolder, setTextBoxPlaceHolder] = useTypewriter({
        words: ["yourusername"],
        loop: 0
    })
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [isUsernameTakenVal, setIsUsernameTaken] = useState(false);

    const handleUsernameSubmit = () => {
        if (getCurrentUser() == null) {
            handleShowSignUpModal()
        }
    }

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleShowSignUpModal = () => setShowSignUpModal(true);

    useEffect(() => {
        isUsernameTaken(username).then((response) => {
            console.log(response.data + " " + username)
            setIsUsernameTaken(!response.data)
        })
    }, [username]);


    return (
        <div>

            <SignUpComponent
                showSignUpModal={showSignUpModal}
                setShowSignUpModal={setShowSignUpModal}
                username={username}></SignUpComponent>

            <LoginComponent
                setShowLoginModal={setShowLoginModal}
                showLoginModal={showLoginModal}></LoginComponent>

            <Container className="mt-3">
                <Card className="p-1 rounded-pill shadow-sm p-1 mb-5 bg-body rounded">
                    <Row className=" align-items-center">
                        <Col className="m-2">
                            <span className="align-middle">
                            <h5>
                                Dp.me
                            </h5>
                            </span>
                            
                        </Col>
                        <Col className="m-1 d-flex justify-content-end">
                            {getCurrentUser() ?
                                <Button variant="dark" className="rounded-pill" onClick={logoutUser}>
                                    Sign out
                                </Button> :
                                <Button variant="dark" className="rounded-pill" onClick={handleShowLoginModal}>
                                    Sign in
                                </Button>}
                        </Col>
                    </Row>
                </Card>

            </Container>

            <Container className="w-50 mt-5 pt-5">
                <Row>
                    <div className="display-2 mb-3 home-font text-center" >
                        Your developer portfolio is one click away!
                    </div>
                </Row>
                <div className="d-flex justify-content-center">
                    <Row className="w-75 align-middle  ">
                        <Col xs={9}>
                            <InputGroup className="align-middle ">
                                <Form.Control
                                    className="rounded-pill"
                                    id="basic-url"
                                    aria-describedby="basic-addon3"
                                    required
                                    placeholder={textBoxPlaceHolder + "|"}
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                    }}
                                />
                            </InputGroup>
                            {username !== "" && ((!isUsernameTakenVal) ?
                                <Form.Text className=" text-danger">
                                    Username Taken
                                </Form.Text>
                                :
                                <Form.Text className="text-success">
                                    Looks Good!
                                </Form.Text>)
                            }
                        </Col>
                        <Col>
                            <Button
                                disabled={
                                    (!getCurrentUser() &&
                                        username !== "" &&
                                        isUsernameTakenVal) ? false : true}
                                onClick={handleUsernameSubmit}
                                variant="dark"
                                className="rounded-pill" >Launch</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default HomePage;