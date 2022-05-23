import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

export default function Pizza({name, toppings}) {
  return (
    <Card>
      <CardImg
        top
        alt="pizza"
        src="https://storage.googleapis.com/mfs-js/uploads/pizza1.jpg"
        width="100%"
      />
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
  toppings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
};
