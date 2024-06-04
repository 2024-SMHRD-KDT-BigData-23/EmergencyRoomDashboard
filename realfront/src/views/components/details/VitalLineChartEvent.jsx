import { Row, Col } from 'react-bootstrap';

function VitalLineChartEvent({ lineData, selectedLine, setSelectedLine }) {
    return (
        <Row className="g-0 h-100">
            <Col xs={3} className="d-flex flex-column bg-light">
                {lineData.datasets.map((dataset, index) => (
                    <div className="d-flex justify-content-center align-items-center w-100" key={index} onClick={() => setSelectedLine(index)} style={{ cursor: 'pointer', flexGrow: 1, fontWeight: selectedLine === index ? 'bold' : 'normal', backgroundColor: selectedLine === index ? '#007bff' : 'transparent', color: selectedLine === index ? 'white' : 'black' }}>
                        {dataset.label}
                    </div>
                ))}
            </Col>
            <Col xs={9} className="h-100"></Col>
        </Row>
    )
}

export default VitalLineChartEvent;