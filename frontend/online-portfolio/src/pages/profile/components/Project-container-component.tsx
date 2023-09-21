import { Badge, Button, Col, Container, Row, Stack, Modal, Form, Dropdown } from 'react-bootstrap';
import { Project } from '../../../types/Project';
import * as Icon from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { shouldShowEditButtons } from '../../../service/ProfileService';

function ProjectContainer(props: {
    project: Project,
    handleDelete: (id: number | undefined) => void
}) {

    const params = useParams<{ username: string }>();

    return (
        <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle shadow elevated-card rounded  p-3" id="exp-card">
            <div>
                <Row>
                    <Col>
                        <h6 className="text-break"> {props.project.title} </h6>
                    </Col>
                    {shouldShowEditButtons(params.username) &&
                        <Col className='d-flex justify-content-end'>
                            <Dropdown>
                                <Dropdown.Toggle as={Icon.ThreeDotsVertical} role='button' id="dropdown-basic">
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Edit <Icon.PencilFill></Icon.PencilFill></Dropdown.Item>
                                    <Dropdown.Item onClick={() => props.handleDelete(props.project.id)} className="text-danger">Delete <Icon.Trash3></Icon.Trash3> </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    }

                </Row>
                <p className="text-break">
                    {props.project.description}
                </p>
                <div className='d-flex flex-wrap'>
                    {props.project.skills.map((skill, i) => {
                        return <Badge key={i} className='m-1' style={{ color: 'black' }} pill bg='warning'> {skill} </Badge>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectContainer;