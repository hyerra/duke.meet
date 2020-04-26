import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import userAPI from '../api/user';

class NavigationBar extends React.Component {
    state = { isLoggedIn: false };

    componentDidMount() {
      this.checkLoggedIn();
    }

    componentWillMount() {
      this.unlisten = this.props.history.listen((location, action) => {
        this.checkLoggedIn();
      });
    }

    componentWillUnmount() {
      this.unlisten();
    }

    async checkLoggedIn() {
      try {
        await userAPI.get('/');
        this.setState({ isLoggedIn: true });
      } catch {
        this.setState({ isLoggedIn: false });
      }
    }

    render() {
      return (
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
            {
                      this.state.isLoggedIn
                        ? (
                          <Menu.Item
                            as={NavLink}
                            to="/profile"
                            name="profile"
                            activeClassName="active"
                          />
                        )
                        : (
                          <>
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
                          </>
                        )
                  }
          </Menu.Menu>
        </Menu>
      );
    }
}

export default withRouter(NavigationBar);
