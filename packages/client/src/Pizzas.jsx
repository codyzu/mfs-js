import {useQuery} from 'urql';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import Pizza from './Pizza';

const pizzasQuery = `query { 
  pizzaList {
    id
    name
    image
    toppings {
      id
      name
      type 
    }
  }
}`;

export default function Pizzas() {
  const [result, reexecuteQuery] = useQuery({
    query: pizzasQuery,
  });

  const {data, fetching, error} = result;

  if (error) {
    return <span>something went wrong: {error.message}</span>;
  }

  if (fetching) {
    return <span>Loading...</span>;
  }

  return (
    <Container>
      <Row>
        {data.pizzaList.map((pizza) => (
          <Col key={pizza.id} xs={12} lg={6} xl={4}>
            <Link to={`/pizza/${pizza.id}`} className="text-decoration-none">
              <Pizza {...pizza} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
