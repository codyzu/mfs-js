import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import {Container} from 'reactstrap';
import Pizza from './Pizza';
import Loading from './Loading';

const pizzaQuery = `query($pizzaId: Int!) { 
  pizza(id: $pizzaId) {
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

export default function PizzaDetails() {
  const {pizzaId} = useParams();
  const [result] = useQuery({
    query: pizzaQuery,
    variables: {pizzaId: Number.parseInt(pizzaId, 10)},
  });

  const {data, fetching, error} = result;

  if (error) {
    return <span>something went wrong: {error.message}</span>;
  }

  if (fetching) {
    return <Loading />;
  }

  return (
    <Container className="my-2">
      <Pizza {...data.pizza} />
    </Container>
  );
}
