import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import { Project } from '../../../types/Project';

function ProjectContainer(props: { project: Project }) {

    return (
        <div className="justify-content-center align-items-center 
                      h-100 w-100  align-middle border rounded  p-3" id="exp-card">
            <div>
                <h6 className="text-break"> {props.project.title} </h6>
                    <p className="text-break">
                        {props.project.description}
                    </p>
                <div className='d-flex flex-wrap'>
                    {props.project.skills.map((skill) => {
                        return <Badge className='m-1' pill bg="secondary "> {skill} </Badge>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectContainer;