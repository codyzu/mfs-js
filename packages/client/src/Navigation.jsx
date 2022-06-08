import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {useState} from 'react';
import Slice from './favicon.svg';

export default function Navigation() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar light color="light" expand="md" container="md">
      <NavbarBrand to="/" tag={Link}>
        <Slice width="1em" className="me-1" />
        MFS Pizza
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse navbar isOpen={!collapsed}>
        <Nav navbar className="me-auto">
          <NavItem>
            <NavLink tag={RRNavLink} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/pizzas">
              Menu
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/create">
              Create
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/codyzu/mfs-js">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
