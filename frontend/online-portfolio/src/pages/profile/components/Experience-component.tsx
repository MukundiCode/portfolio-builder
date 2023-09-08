import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Experience } from "../../../types/Experience";
import ExperienceContainer from "./Experience-container-component";
import { Typeahead } from "react-bootstrap-typeahead";
import { getSkills } from "../data/skills";
import { addExperience, deleteExperience, getAllExperiences } from "../../../service/ProfileService";
import { Formik } from "formik";
import * as yup from 'yup';

function ExperienceListComponent(props: {
    portfolioId: number | undefined
}) {

    const [expereinceList, setExperienceList] = useState<Experience[]>([]);
    const [showExperienceModal, setShowExperienceModal] = useState(false);

    useEffect(() => {
        getAllExperiences(props.portfolioId).then(response => {
            setExperienceList(response.data)
        });
    }, []);

    const handleNewExperienceSubmit = async (
        position: string,
        company: string,
        description: string,
        skills: string[],
        since: Date,
        until: Date) => {
        console.log("Dates are " + since)

        const experience: Experience = {
            id: undefined,
            position: position,
            company: company,
            description: description,
            since: since,
            until: until,
            skills: skills
        }
        addExperience(props.portfolioId, experience).then(response => {
            setExperienceList(expereinceList => [response.data, ...expereinceList])
        });

        handleCloseExperienceModal()
    }

    const handleDeleteExperience = async (experienceId: number | undefined) => {
        deleteExperience(props.portfolioId, experienceId)
            .then(response => {
                setExperienceList((prev) => [...prev.filter(item => item.id !== experienceId)])
            });
    }

    const handleCloseExperienceModal = () => setShowExperienceModal(false);
    const handleShowExperienceModal = () => setShowExperienceModal(true);

    const schema = yup.object().shape({
        position: yup.string().required(),
        company: yup.string().required(),
        from: yup.string().required(),
        to: yup.string().required(),
        skills: yup.array(),
        description: yup.string().required(),
    });

    return (
        <div>

            <Modal show={showExperienceModal} onHide={handleCloseExperienceModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={form => handleNewExperienceSubmit(
                            form.position,
                            form.company,
                            form.description,
                            form.skills,
                            new Date(form.from),
                            new Date(form.to))}
                        initialValues={{
                            position: "",
                            company: "",
                            from: "",
                            to: "",
                            skills: [],
                            description: ""
                        }}>
                        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='position'
                                        value={values.position}
                                        isInvalid={!!errors.position}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.position}
                                    </Form.Control.Feedback>

                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='company'
                                        value={values.company}
                                        isInvalid={!!errors.company}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.company}
                                    </Form.Control.Feedback>
                                    <Row>
                                        <Col>
                                            <Form.Label>From</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="from"
                                                placeholder="Start date"
                                                value={values.from}
                                                isInvalid={!!errors.from}
                                                onChange={handleChange}
                                                required />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.from}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col>
                                            <Form.Label>To</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="to"
                                                placeholder="End date"
                                                value={values.to}
                                                isInvalid={!!errors.to}
                                                onChange={handleChange}
                                                required />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.to}
                                            </Form.Control.Feedback>
                                        </Col>

                                    </Row>

                                    <Form.Label>Skills</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey="name"
                                        multiple
                                        onChange={selected => {
                                            setFieldValue('skills', [...values.skills, ...selected], false)
                                        }}
                                        options={getSkills()}
                                        placeholder="Choose a skill..."
                                        selected={values.skills}
                                    />

                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea"
                                        rows={3}
                                        name='description'
                                        value={values.description}
                                        isInvalid={!!errors.description}
                                        onChange={handleChange}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseExperienceModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
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
                {expereinceList.map((experience, i) => <ExperienceContainer key={i} experience={experience} handleDelete={handleDeleteExperience}></ExperienceContainer>)}
            </Stack>
        </div>
    )
}

export default ExperienceListComponent