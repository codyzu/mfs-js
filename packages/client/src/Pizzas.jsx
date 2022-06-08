import {useQuery} from 'urql';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import Pizza from './Pizza';
import Loading from './Loading';

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
    <Container>
      <Row>
        {data.pizzaList.map((pizza) => (
          <Col key={pizza.id} xs={12} lg={6} xl={4}>
            <Link to={`/pizzas/${pizza.id}`} className="text-decoration-none">
              <Pizza {...pizza} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
