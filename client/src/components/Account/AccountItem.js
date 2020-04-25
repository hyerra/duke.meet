import React from 'react';
import { Menu } from 'semantic-ui-react';

const AccountItem = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <UserItem />;
  }
  return <GuestItem />;
};

const UserItem = () => (
  <Menu.Menu position="right">
    <Menu.Item
      name="myAccount"
    />
    <Menu.Item
      name="logout"
    />
  </Menu.Menu>
);

const GuestItem = () => (
  <Menu.Menu position="right">
    <Menu.Item
      name="login"
    />
  </Menu.Menu>
);

export default AccountItem;
