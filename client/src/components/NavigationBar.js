import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import AccountItem from './Account/AccountItem';

const NavigationBar = () => (
  <Menu secondary>
    <Menu.Item
      as={NavLink}
      exact
      to="/"
      name="home"
      activeClassName="active"
    />
    <Menu.Item
      as={NavLink}
      to="/projects"
      name="projects"
      activeClassName="active"
    />
    <Menu.Item
      as={NavLink}
      to="/about"
      name="about"
      activeClassName="active"
    />
    <Menu.Menu position="right">
      <AccountItem />
    </Menu.Menu>
  </Menu>
);

export default NavigationBar;
