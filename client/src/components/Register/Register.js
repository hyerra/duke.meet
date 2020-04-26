import React from 'react';
import { Form, Image, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import userAPI from './../../api/user';
import registerImage from '../images/026.png';

class Register extends React.Component {
  state = { name: '', email: '', password: '', year: '', major: '', error: false, shouldRedirect: false };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    console.log('hi');
    const { name, email, password, year, major } = this.state;
    userAPI.post('/', { name, email, password, year, major })
        .then(() => {
          this.setState({ shouldRedirect: true });
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: true })
        });
  };

  render() {
    const { name, email, password, year, major, shouldRedirect } = this.state;
    const options = ['2020', '2021', '2022', '2023', '2024'].map(year => { return { key: year, text: year, value: year } });
    if (shouldRedirect) return <Redirect to='/' />;

    return (
        <div
        style={{
          marginTop: '3rem',
          marginBottom: '5rem',
          display: 'flex',
          width: '100%',
        }}
    >
      <div style={{ width: '30%', paddingTop: '2rem' }}>
        <h1>Sign Up</h1>
        <Form error={this.state.error} style={{ paddingTop: '2rem' }} onSubmit={this.handleSubmit}>
          <Form.Input name="name" label="Name" type="text" value={name} placeholder="John Doe" onChange={this.handleChange} />
          <Form.Input name="email" label="Email" type="email" value={email} placeholder="example@example.com" onChange={this.handleChange} />
          <Form.Input name="password" label="Password" type="password" value={password} placeholder="*******" onChange={this.handleChange} />
          <Form.Select
              fluid
              label="Year"
              options={options}
              placeholder="Year"
              name="year"
              value={year}
              onChange={this.handleChange}
          />
          <Form.Input name="major" label="Major" type="text" value={major} placeholder="Major" onChange={this.handleChange} />
          <Message
              error
              header='Incorrect Credentials'
              content='Please make sure you have not signed up with the same email twice and you have the correct username and password.'
          />
          <Form.Button style={{ marginBottom: '4rem' }}>Sign Up</Form.Button>
        </Form>
      </div>
      <div style={{ width: '22%' }} />
      <div style={{ width: '48%', paddingTop: '4rem' }} className="ui centered image">
        <Image class="ui centered image" src={registerImage} size="large" />
      </div>
    </div>
    )
  }
};

export default Register;
