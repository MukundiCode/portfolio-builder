import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import ExperienceContainer from './Experience-container-component';
import ProjectContainer from './Project-container-component';
import { Experience } from '../../../types/Experience';
import { Project } from '../../../types/Project';

function AboutAndExperience(props: { expereinceList: Experience[], projectList: Project[] }) {
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
                            {props.expereinceList.map((experience) => <ExperienceContainer experience={experience} ></ExperienceContainer>)}
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
                        <Stack gap={3}>
                            {props.projectList.map((project) => <ProjectContainer project={project}></ProjectContainer>)}
                        </Stack>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutAndExperience;