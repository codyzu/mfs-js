import {useEffect} from 'react';
import {Card, CardBody, CardText} from 'reactstrap';
import {useQuery} from 'urql';

const todosQuery = `query { 
  getPizzas {
    name
    toppings {
      name
    }
  }
}`;

function Home() {
  const [result, reexecuteQuery] = useQuery({
    query: todosQuery,
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

  // Console.log(result);

  // Console.log(result);
  return (
    <Card>
      <CardBody>
        <CardText className="text-center">Welcome Home</CardText>
        <CardText className="text-center">
          {result.loading
            ? 'Loading'
            : result.error
            ? 'Error'
            : JSON.stringify(result.data, null, 2)}
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Home;
