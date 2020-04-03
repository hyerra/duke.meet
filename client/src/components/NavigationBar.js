import React from 'react';
import { Menu } from 'semantic-ui-react';
import AccountItem from './AccountItem';

class NavigationBar extends React.Component {

    handleItemClick = (e, { name }) => this.props.updateItem(name);

    render() {
        return (
            <Menu secondary>
                <Menu.Item
                    name='home'
                    active={this.props.activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='projects'
                    active={this.props.activeItem === 'projects'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <AccountItem />
                </Menu.Menu>
            </Menu>
        );
    }
}

export default NavigationBar;