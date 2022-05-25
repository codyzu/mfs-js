import {useQuery} from 'urql';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import Pizza from './Pizza';

const pizzasQuery = `query { 
  getPizzas {
    id
    name
    toppings {
      id
      name
    }
  }
}`;

export default function Pizzas() {
  const [result, reexecuteQuery] = useQuery({
    query: pizzasQuery,
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

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
        {data.getPizzas.map((pizza) => (
          <Col key={pizza.id}>
            <Pizza {...pizza} />
            <Link to={`/pizza/${pizza.id}`}>Details</Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
