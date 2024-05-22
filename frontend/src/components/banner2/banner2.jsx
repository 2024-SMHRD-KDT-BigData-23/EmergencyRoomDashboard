import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const HeaderBanner2 = ({children}) => {
    return (
        <div className="static-slider-head banner2">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                       
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderBanner2;
