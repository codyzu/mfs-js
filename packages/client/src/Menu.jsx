import {Container, Row, Col} from 'reactstrap';
import Pizzas from './Pizzas';

export default function Menu() {
  return (
    <Container className="my-2">
      <Row>
        <Col>
          <Pizzas />
        </Col>
      </Row>
    </Container>
  );
}
