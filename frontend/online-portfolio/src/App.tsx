import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocialIcon } from 'react-social-icons';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience/Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid className='w-75'>
        <Row>
          <Col xs={5}>
            <div className='sticky-top d-flex justify-content-center mt-4 pt-5 '>
              <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                <h5>
                  Hie There, I am
                </h5>

                <div className="display-2 mb-3 name-font" >
                  Mukundi Chitamba
                </div>

                <div className='mb-3'>
                  Professional Software Developer with a passion for delivering reliable software solutions
                </div>

                <div>
                  <Stack direction="horizontal" gap={2}>
                    <Button variant="dark">
                      Hire Me
                    </Button>
                    <Button variant="dark">
                      CV
                    </Button>
                  </Stack>
                </div>

                <div className='mt-3 pt-3'>
                  <Stack direction="horizontal" gap={2}>
                    <SocialIcon url="https://twitter.com/" bgColor="black" style={{ height: 40, width: 40 }}/>
                    <SocialIcon url="https://www.linkedin.com/in/tinashe-mukundi-chitamba-1843391a7/" bgColor="black" style={{ height: 40, width: 40 }} />
                    <SocialIcon url="https://github.com/MukundiCode" bgColor="black" style={{ height: 40, width: 40 }}/>
                  </Stack>
                </div>

              </div>
            </div>
          </Col>

          <Col>
            <div className='d-flex justify-content-center mt-4 pt-5'>
              <div className="justify-content-center align-items-center 
              h-100 w-100  align-middle  rounded  p-3" id="intro">

                <div>
                  <h5>
                    About Me
                  </h5>
                  <p>
                    Professional Software Developer with a passion for delivering reliable software solutions.
                    Professional Software Developer with a passion for delivering reliable
                    software solutions. Professional Software Developer with a passion for delivering reliable software solutions. Professional Software Developer with a passion for delivering reliable software solutions
                  </p>
                </div>

                <div>
                  <Row>
                    <Col>
                      <h5>Experience</h5>
                    </Col>
                    <Col>
                      <div className='d-flex justify-content-end'>
                        <Button variant='light' className='new-section-element-button' onClick={handleShow}>+</Button>
                      </div>
                    </Col>
                  </Row>
                  <Stack gap={3}>
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
                  </Stack>
                </div>

                <div className='mt-3'>
                  <Row>
                    <Col>
                      <h5>Projects</h5>
                    </Col>
                    <Col>
                      <div className='d-flex justify-content-end'>
                        <Button variant='light' className='new-section-element-button' onClick={handleShow}>+</Button>
                      </div>
                    </Col>
                  </Row>
                  <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle border rounded  p-3" id="exp-card">
                    <div>
                      <h6>Platform that does something</h6>
                      <p>
                        Developed the ecocash platform and did this then that then another
                        dumb boring thing again. Developed the ecocash platform and did
                        this then that then another dumb boring thing again
                      </p>
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
                </div>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
