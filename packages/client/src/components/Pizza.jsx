import {Container, Row, Col, Table} from 'reactstrap';
import Cheese from '../icons/cheese.svg';
import Sauce from '../icons/soup-ladle.svg';
import Meat from '../icons/salami.svg';
import Vegetable from '../icons/vegetables.svg';
import pizzaProps from './pizza-props';

export default function Pizza({name, description, toppings, image}) {
  return (
    <Container>
      <Row>
        <Col>
          <div className="ratio ratio-16x9">
            <img
              alt="pizza"
              src={image}
              className="img-fluid rounded shadow-lg"
              style={{objectFit: 'cover'}}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-5 pt-3">
        <Col xs={12} sm="auto">
          <h1 className="display-3">{name}</h1>
        </Col>
        <Col>{description}</Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4>Toppings</h4>
          <Table>
            <tbody>
              {toppings.map((topping) => (
                <tr key={topping.id} className="">
                  <td>
                    <Icon
                      type={topping.type}
                      width="1.25em"
                      fill="currentColor"
                      className="me-2"
                    />
                  </td>
                  <td>{topping.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
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

Pizza.propTypes = pizzaProps;
