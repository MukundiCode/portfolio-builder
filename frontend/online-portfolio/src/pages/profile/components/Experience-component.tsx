import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Experience } from "../../../types/Experience";
import ExperienceContainer from "./Experience-container-component";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { getSkills } from "../data/skills";

function ExperienceListComponent(props: {
    portfolioId: number | undefined
}) {

    const [expereinceList, setExperienceList] = useState<Experience[]>([]);
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [experienceSkills, setExperienceSkills] = useState<string[]>([]);
    const [experience, setExperience] = useState<Experience>({
        position: '',
        company: '',
        description: '',
        since: new Date(),
        until: new Date(),
        skills: []
    });

    useEffect(() => {
        axios.get('http://localhost:8080/portfolio/' + props.portfolioId + '/experience/all')
            .then(response => {
                setExperienceList(response.data)
            });
    }, []);

    const getExperienceHandler = (name: keyof Experience) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setExperience({ ...experience, [name]: event.target.value });
        };
    };

    const handleNewExperienceSubmit = async () => {
        experience.skills = experienceSkills
        axios.post('http://localhost:8080/portfolio/' + props.portfolioId + '/experience/add',
            experience, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                setExperienceList(expereinceList => [response.data, ...expereinceList])
            });


        setExperience({
            position: '',
            company: '',
            description: '',
            since: new Date(),
            until: new Date(),
            skills: []
        })
        handleCloseExperienceModal()
    }

    const handleCloseExperienceModal = () => setShowExperienceModal(false);
    const handleShowExperienceModal = () => setShowExperienceModal(true);

    return (
        <div>

            <Modal show={showExperienceModal} onHide={handleCloseExperienceModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={getExperienceHandler('position')}
                            />

                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={getExperienceHandler('company')}
                            />
                            <Row>
                                <Col>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="date"
                                        name="dob"
                                        placeholder="Start date"
                                        onChange={getExperienceHandler('since')} />
                                </Col>
                                <Col>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="date"
                                        name="dob"
                                        placeholder="End date"
                                        onChange={getExperienceHandler('until')} />
                                </Col>

                            </Row>

                            <Form.Label>Skills</Form.Label>
                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                multiple
                                onChange={selected => {
                                    setExperienceSkills(selected.map(s => s.toString()))
                                }}
                                options={getSkills()}
                                placeholder="Choose a skill..."
                                selected={experienceSkills}
                            />

                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                onChange={getExperienceHandler('description')} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseExperienceModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNewExperienceSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <h5>
                        <Stack direction='horizontal' gap={3}>
                            <div>
                                Experience
                            </div>
                            <Icon.PlusSquareDotted role='button' onClick={handleShowExperienceModal} ></Icon.PlusSquareDotted>
                        </Stack>
                    </h5>


                </Col>
                <Col>
                    <div className='d-flex justify-content-end'>
                    </div>
                </Col>
            </Row>
            <Stack gap={3}>
                {expereinceList.map((experience, i) => <ExperienceContainer key={i} experience={experience} ></ExperienceContainer>)}
            </Stack>
        </div>
    )
}

export default ExperienceListComponent