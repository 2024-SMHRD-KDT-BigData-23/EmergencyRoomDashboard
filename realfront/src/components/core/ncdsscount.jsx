import React from "react";
import { Col, Row } from "react-bootstrap";
import '../../assets/scss/ncdsscount.scss'

const NCount = () => {

    return(
    <Row>
        <Col className="d-flex CountGap">
            <span className="CountFont">
            Discharge  
            </span>
            <div className="countCircle CircleOne">
            32
            </div>
        </Col>
        <Col className="d-flex CountGap">
            <span className="CountFont"> 
            Ward
            </span>
            <div className="countCircle CircleTwo">
            44
            </div>

        </Col>
        <Col className="d-flex CountGap">
            <span className="CountFont">
            ICU
            </span>
            <div className="countCircle CircleThr">
            22
            </div>
        </Col>
    </Row>

    
    );

};

export default NCount;