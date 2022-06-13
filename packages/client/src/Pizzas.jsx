import {useQuery} from 'urql';
import {Container, Row, Col} from 'reactstrap';
import Loading from './Loading';
import PizzaOverview from './PizzaOverview';

const pizzasQuery = `query { 
  pizzaList {
    id
    name
    description
    image
    toppings {
      id
      name
      type 
    }
  }
}`;

export default function Pizzas() {
  const [result] = useQuery({
    query: pizzasQuery,
  });

  const {data, fetching, error} = result;

  if (error) {
    return <span>something went wrong: {error.message}</span>;
  }

  if (fetching) {
    return <Loading />;
  }

  return (
    <Container className="px-4">
      <Row>
        <Col>
          <h1 className="display-3">Menu</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="px-0">
            {data.pizzaList.map((pizza) => (
              <PizzaOverview key={pizza.id} {...pizza} />
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
