import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import { Experience } from '../../../types/Experience';

function ExperienceContainer(props: { experience: Experience }) {
    return (
        <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle border rounded  p-3" id="exp-card">
            <Container>
                <Row >
                    <Col xs={3}>
                        <div>
                            <p className="font-weight-light" >{props.experience.from.toString()} - {props.experience.to.toString()}</p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h6>{props.experience.position}: {props.experience.company}</h6>
                            <p>
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