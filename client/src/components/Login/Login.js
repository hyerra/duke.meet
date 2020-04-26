import React from 'react';
import {Form, Image, Message} from 'semantic-ui-react';
import userAPI from './../../api/user';
import loginImage from '../images/025.png';
import { Redirect } from "react-router-dom";

class Login extends React.Component {
    state = { email: '', password: '', error: false, shouldRedirect: false };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { email, password } = this.state;
        const request = userAPI.post('/login', { email, password })
            .then(() => {console.log('Success');
                this.setState({ shouldRedirect: true })})
            .catch(error => {
                console.log(error);
                this.setState({ error: true })});
        console.log(request);
    };

  render() {
      const { email, password, shouldRedirect } = this.state;
      if (shouldRedirect) return <Redirect to='/' />;

      return (
          <div
          style={{
              marginTop: '5rem',
              marginBottom: '5rem',
              display: 'flex',
              width: '100%',
          }}
      >
          <div style={{ width: '30%', paddingTop: '4rem' }}>
              <h1>Login</h1>
              <Form error={this.state.error} onSubmit={this.handleSubmit} style={{ paddingTop: '2rem' }}>
                  <Form.Input name="email" label="Email" type="email" value={email} onChange={this.handleChange} placeholder="example@example.com" />
                  <Form.Input name="password" label="Password" type="password" value={password} onChange={this.handleChange} placeholder="*******" />
                  <Message
                      error
                      header='Incorrect Credentials'
                      content='Please make sure you have the correct email and password.'
                  />
                  <Form.Button>Login</Form.Button>
              </Form>
          </div>
          <div style={{ width: '20%' }} />
          <div style={{ width: '50%', paddingTop: '0rem' }} className="ui centered image">
              <Image class="ui centered image" src={loginImage} size="large" />
          </div>
      </div>
      );
  }
};

export default Login;
