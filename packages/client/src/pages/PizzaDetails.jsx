import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import {Container} from 'reactstrap';
import Pizza from '../components/Pizza';
import Loading from '../components/Loading';

const pizzaQuery = `query($pizzaId: String!) { 
  pizza(id: $pizzaId) {
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

export default function PizzaDetails() {
  const {pizzaId} = useParams();
  const [result] = useQuery({
    query: pizzaQuery,
    variables: {pizzaId},
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
