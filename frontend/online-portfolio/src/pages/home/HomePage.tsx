import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useTypewriter } from 'react-simple-typewriter';

function HomePage() {

    const [username, setUsername] = useState<string>();
    const [textBoxPlaceHolder, setTextBoxPlaceHolder] = useTypewriter({
        words: ["yourusername"],
        loop: 0
    })

    const handleUsernameSubmit = () => {
        console.log("Clicked")
        axios.post('http://localhost:8080/portfolio/add', { username: username })
            .then(response => {
                console.log(response.data)
                window.location.href = `/${username}`
            });
    }

    return (
        <div>
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
                                placeholder={textBoxPlaceHolder}
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