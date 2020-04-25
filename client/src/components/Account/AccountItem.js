import React from 'react';
import { Menu } from 'semantic-ui-react';

const AccountItem = props => {
    if (props.isLoggedIn) {
        return <UserItem />;
    }
    return <GuestItem />
};

const UserItem = props => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item
                name='myAccount'
            />
            <Menu.Item
                name='logout'
            />
        </Menu.Menu>
    );
};

const GuestItem = props => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item
                name='login'
            />
        </Menu.Menu>
    );
};

export default AccountItem;