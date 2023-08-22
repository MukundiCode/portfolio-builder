import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';

function ProjectContainer() {

    return (
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
    )

}

export default ProjectContainer;