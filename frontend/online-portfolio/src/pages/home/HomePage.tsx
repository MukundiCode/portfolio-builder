import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useTypewriter } from 'react-simple-typewriter';
import { getCurrentUser, loginUser, signupUser } from "../../service/ProfileService";
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

    const handleUsernameSubmit = () => {
        if (getCurrentUser() == null) {
            handleShowSignUpModal()
        }
    }

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleShowSignUpModal = () => setShowSignUpModal(true);

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
                            <h4>
                                Devportfolio.me
                            </h4>
                        </Col>
                        <Col className="m-1 d-flex justify-content-end">
                            <Button variant="dark" className="rounded-pill" onClick={handleShowLoginModal}>
                                Sign in
                            </Button>
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
                <Row className="d-flex justify-content-center">
                    <div className="w-75 align-middle">
                        <InputGroup className="mb-3 align-middle ">
                            <InputGroup.Text id="basic-addon3">
                                devportfolio.me/
                            </InputGroup.Text>
                            <Form.Control
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                required
                                placeholder={textBoxPlaceHolder + "|"}
                                onChange={(event) => setUsername(event.target.value)} />
                            <Button onClick={handleUsernameSubmit} variant="dark" >Launch</Button>
                        </InputGroup>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;