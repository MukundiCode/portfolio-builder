import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function HomePage() {

    const [username, setUsername] = useState<string>();

    const handleUsernameSubmit = () => { 
        console.log("Clicked")
        axios.post('http://localhost:8080/portfolio/add', {username: username})
            .then(response => {
                console.log(response.data)
                window.location.href = `/${username}`
            });
    }

    return (
        <div className="h-100">
            <Container className="w-75 align-middle">
                <Row>
                    <div className="display-2 mb-3 name-font " >
                        Your developer portfolio is one click away!
                    </div>
                </Row>
                <Row className="w-50 align-middle">
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                devportfolio.me/
                            </InputGroup.Text>
                            <Form.Control
                                id="basic-url"
                                aria-describedby="basic-addon3"
                                onChange={(event) => setUsername(event.target.value)} />
                        </InputGroup>
                        <Button onClick={handleUsernameSubmit}>Launch</Button>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;