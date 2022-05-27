import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

export default function Pizza({name, toppings, image}) {
  return (
    <Card>
      <div className="ratio ratio-16x9">
        <CardImg
          top
          alt="pizza"
          src={image}
          className="img-fluid"
          style={{objectFit: 'cover'}}
        />
      </div>
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
      </CardBody>
      <ListGroup flush>
        {toppings.map((topping) => (
          <ListGroupItem key={topping.id}>{topping.name}</ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
}

Pizza.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  toppings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
};
