import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

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
      <Menu.Item
        as={NavLink}
        to="/login"
        name="login"
        activeClassName="active"
      />
      <Menu.Item
        as={NavLink}
        to="/sign_up"
        name="sign up"
        activeClassName="active"
      />
        <Menu.Item
            as={NavLink}
            to="/profile"
            name="profile"
            activeClassName="active"
        />
    </Menu.Menu>
  </Menu>
);

export default NavigationBar;
