import {Card, CardBody, CardText} from 'reactstrap';
import {useQuery} from 'urql';

const todosQuery = `
  query { 
    add(x: 2, y: 2)
  }
`;

function Home() {
  const [result, reexecuteQuery] = useQuery({
    query: todosQuery,
  });

  console.log(result);
  return (
    <Card>
      <CardBody>
        <CardText className="text-center">
          Welcome Home{' '}
          <p>
            {result.loading
              ? 'Loading'
              : result.error
              ? 'Error'
              : JSON.stringify(result.data, null, 2)}
          </p>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Home;
