import { useState } from 'react';
import { Badge, Button, Col, Container, Row, Stack, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameAndLinks from './components/Name-and-links-component';
import AboutAndExperience from './components/About-and-experience-componenets';

function Profile() {
    return (
        <div>
            <Container fluid className='w-75'>
                <Row>
                    <Col xs={5}>
                        <NameAndLinks></NameAndLinks>
                    </Col>

                    <Col>
                    <AboutAndExperience></AboutAndExperience>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
