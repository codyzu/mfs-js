import {Row, Col} from 'reactstrap';
import Pizzas from './Pizzas';

function Home() {
  return (
    <Row>
      <Col>
        <Pizzas />
      </Col>
    </Row>
  );
}

export default Home;
