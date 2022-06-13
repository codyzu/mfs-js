import {Container, Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import classes from './home.module.css';

function Home() {
  return (
    <>
      <div
        className="vw-100 vh-100 overflow-hidden text-center d-flex justify-content-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/images/pizza1.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="align-self-center display-4 fw-bold text-white">
          Pizza is awesome.
        </h1>
      </div>
      <Container className="my-5">
        <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <Col lg={7} className="p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">
              It&apos;s even more awesome with GraphQL!
            </h1>
            <p className="lead">
              When combining the best ingredients and well designed APIs that
              match the business domain, we can enable caching in the GraphQL
              client to reduce the need for storing global state. Urql includes
              a graph cache, then when configured correctly, can normalize
              entities from queries in order to cache each entity, no matter the
              query that was used to fetch it.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Button
                color="primary"
                size="lg"
                className="px-4 me-md-2 fw-bold"
                tag={Link}
                to="/pizzas"
              >
                Menu
              </Button>
            </div>
          </Col>
          <Col lg={4} className="offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img
              className={classes['rounded-lg-3']}
              src="/images/pizza2.jpg"
              alt=""
              width="720"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
