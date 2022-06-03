import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Cheese from './cheese.svg';
import Sauce from './soup-ladle.svg';
import Meat from './salami.svg';
import Vegetable from './vegetables.svg';

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
          <ListGroupItem key={topping.id} className="h5">
            <Icon
              type={topping.type}
              width="1.25em"
              fill="currentColor"
              className="me-2"
            />
            {topping.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
}

// eslint-disable-next-line react/prop-types
function Icon({type, ...rest}) {
  if (type === 'cheese') {
    return <Cheese {...rest} />;
  }

  if (type === 'meat') {
    return <Meat {...rest} />;
  }

  if (type === 'sauce') {
    return <Sauce {...rest} />;
  }

  if (type === 'vegetable') {
    return <Vegetable {...rest} />;
  }

  return null;
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
