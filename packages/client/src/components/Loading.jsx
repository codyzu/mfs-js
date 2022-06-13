import {Container, Row, Col, Spinner} from 'reactstrap';

function Loading() {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs="auto">
          <Spinner style={{width: '3em', height: '3em'}}>Loading...</Spinner>
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
