import React from 'react';
import { Form, Image } from 'semantic-ui-react';
import loginImage from '../images/025.png';

const Login = () => (
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
      <Form style={{ paddingTop: '2rem' }}>
        <Form.Input label="Email" type="email" placeholder="example@example.com" />
        <Form.Input label="Password" type="password" placeholder="*******" />
        <br/><br/>
        <Form.Button>Login</Form.Button>
      </Form>
    </div>
    <div style={{ width: '20%' }} />
    <div style={{ width: '50%', paddingTop: '0rem' }} className="ui centered image">
      <Image class="ui centered image" src={loginImage} size="large" />
    </div>
  </div>
);

export default Login;
