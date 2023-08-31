import { Badge, Button, Col, Container, Row, Stack, Modal, Form, Dropdown } from 'react-bootstrap';
import { Experience } from '../../../types/Experience';
import * as Icon from 'react-bootstrap-icons';

function ExperienceContainer(props: { experience: Experience }) {
    let from = new Date(props.experience.since)
    let to = new Date(props.experience.until)
    return (
        <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle border rounded  p-3" id="exp-card">
            <Container>
                <Row >
                    <Col xs={3}>
                        <div>
                            <p className="font-weight-light" ><small>{from.getFullYear() + "/" + from.getMonth()} - {to.getFullYear() + "/" + to.getMonth()}</small></p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Row>
                                <Col xs={10}>
                                    <h6 className="text-break">{props.experience.position}: {props.experience.company}</h6>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Dropdown>
                                        <Dropdown.Toggle as={Icon.ThreeDotsVertical} role='button' id="dropdown-basic">
                                            {/* <Icon.ThreeDotsVertical></Icon.ThreeDotsVertical> */}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <p className="text-break">
                                {props.experience.description}
                            </p>
                            <div>
                                <div className='d-flex flex-wrap'>
                                    {props.experience.skills.map((skill) => {
                                        return <Badge className='m-1' pill bg="secondary "> {skill} </Badge>
                                    })}
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