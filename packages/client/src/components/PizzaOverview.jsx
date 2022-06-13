import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import pizzaProps from './pizza-props';

export default function PizzaOverview({id, name, image, description}) {
  return (
    <Row className="flex-lg-row-reverse align-items-center mb-5 p-5 rounded shadow-lg">
      <Col lg={6} className="mb-3 mb-lg-0">
        <div className="ratio ratio-16x9">
          <img
            src={image}
            className="d-block mx-lg-auto img-fluid rounded"
            alt="Bootstrap Themes"
            loading="lazy"
            style={{objectFit: 'cover'}}
          />
        </div>
      </Col>
      <Col lg={6} className="align-self-start">
        <h1 className="display-5 fw-bold lh-1 mb-3">{name}</h1>
        <p className="lead">{description}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <Button
            color="primary"
            size="lg"
            className="px-4 me-md-2"
            tag={Link}
            to={`/pizzas/${id}`}
          >
            Details
          </Button>
        </div>
      </Col>
    </Row>
  );
}

PizzaOverview.propTypes = pizzaProps;
