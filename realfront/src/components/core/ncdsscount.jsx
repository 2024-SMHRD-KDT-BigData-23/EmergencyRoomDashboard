import React from "react";
import { Col, Row } from "react-bootstrap";
import '../../assets/scss/ncdsscount.scss'

const NCount = ({ deepNcdssCounts }) => {

    return(
    <Row>
        <Col className="d-flex CountGap">
            <span className="CountFont">
            Discharge
            </span>
            <div className="countCircle CircleOne">
            {deepNcdssCounts.Discharge}
            </div>
        </Col>
        <Col className="d-flex CountGap">
            <span className="CountFont"> 
            Ward
            </span>
            <div className="countCircle CircleTwo">
            {deepNcdssCounts.Ward}
            </div>

        </Col>
        <Col className="d-flex CountGap">
            <span className="CountFont">
            ICU
            </span>
            <div className="countCircle CircleThr">
            {deepNcdssCounts.ICU}
            </div>
        </Col>
    </Row>

    
    );

};

export default NCount;