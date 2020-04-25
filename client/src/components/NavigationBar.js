import React from 'react';
import { Menu } from 'semantic-ui-react';
import AccountItem from './AccountItem';

class NavigationBar extends React.Component {

    handleItemClick = (e, { name }) => this.props.updateItem(name);

    render() {
        return (
          <Menu secondary>
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="projects"
              active={this.props.activeItem === "projects"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="about"
              active={this.props.activeItem === "about"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="jobs"
              active={this.props.activeItem === "jobs"}
              onClick={this.handleItemClick}
            >Jobs (test)</Menu.Item>
            <Menu.Menu position="right">
              <AccountItem />
            </Menu.Menu>
          </Menu>
        );
    }
}

export default NavigationBar;