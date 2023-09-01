import { Badge, Button, Col, Container, Row, Stack, Modal, Form, Dropdown } from 'react-bootstrap';
import { Experience } from '../../../types/Experience';
import * as Icon from 'react-bootstrap-icons';

function ExperienceContainer(props: {
    experience: Experience,
    handleDelete: ( id: number | undefined ) => void
}) {
    const from = new Date(props.experience.since)
    const to = new Date(props.experience.until)

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
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Edit <Icon.PencilFill></Icon.PencilFill></Dropdown.Item>
                                            <Dropdown.Item onClick={() => props.handleDelete(props.experience.id)} className="text-danger">Delete <Icon.Trash3></Icon.Trash3> </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <p className="text-break">
                                {props.experience.description}
                            </p>
                            <div>
                                <div className='d-flex flex-wrap'>
                                    {props.experience.skills.map((skill, i) => {
                                        return <Badge key={i} className='m-1' pill bg="secondary "> {skill} </Badge>
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