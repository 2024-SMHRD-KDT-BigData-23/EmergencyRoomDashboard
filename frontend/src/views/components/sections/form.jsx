import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const PageForm = () => {
    const SERVER_URL = "http://localhost:8080";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpwd: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpwd) {
            alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
            return;
        }
        try {
            const response = await axios.post(SERVER_URL + "/namnam/member/insert", formData);
            console.log(response.data);
            alert("회원가입이 성공적으로 완료되었습니다.");
        } catch (error) {
            console.error("회원가입 실패: ", error);
            alert("회원가입에 실패했습니다.");
        }
    }

    return (
        <div>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Form</h1>
                            <h6 className="subtitle">Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website &amp; dashboard in No-time.</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="row" onSubmit={handleSubmit}>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">User Name</Label>
                                <Input type="text" className="form-control" id="name" placeholder="Enter Username" name="name" value={formData.name} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="email">Email Address</Label>
                                <Input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" className="form-control" id="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="confirmpwd">Confirm Password</Label>
                                <Input type="password" className="form-control" id="confirmpwd" placeholder="Confirm Password" name="confirmpwd" value={formData.confirmpwd} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup className="col-md-12 ml-3">
                                <Input id="checkbox1" type="checkbox" />
                                <Label htmlFor="checkbox1"> Remember me </Label>
                            </FormGroup>
                            <Col md="12">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">Submit</Button>
                                <Button type="button" className="btn btn-inverse waves-effect waves-light">Cancel</Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PageForm;
