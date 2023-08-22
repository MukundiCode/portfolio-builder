import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';

function ExperienceContainer() {
    return (
        <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle border rounded  p-3" id="exp-card">
            <Container>
                <Row >
                    <Col xs={3}>
                        <div>
                            <p className="font-weight-light" >2020 - Present</p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h6>Software Engineer: Econet</h6>
                            <p>
                                Developed the ecocash platform and did this then that then another dumb boring thing again.
                            </p>
                            <div>
                                <div className='d-flex flex-wrap'>
                                    <Badge className='m-1' pill bg="secondary ">
                                        Java
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Spring Boot
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Typescript
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary ">
                                        Java
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Spring Boot
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Typescript
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary ">
                                        Java
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Spring Boot
                                    </Badge>
                                    <Badge className='m-1' pill bg="secondary">
                                        Typescript
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExperienceContainer