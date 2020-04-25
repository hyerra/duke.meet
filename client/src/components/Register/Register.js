import React from 'react';
import { Form, Image } from 'semantic-ui-react';
import registerImage from '../images/026.png';

const options = [
  {
    key: '2020',
    text: '2020',
    value: '2020',
  },
  {
    key: '2021',
    text: '2021',
    value: '2021',
  },
  {
    key: '2022',
    text: '2022',
    value: '2022',
  },
  {
    key: '2023',
    text: '2023',
    value: '2023',
  },
  {
    key: '2024',
    text: '2024',
    value: '2024',
  },
];

const skillOptions = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'java', text: 'Java', value: 'java' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'node', text: 'Nodejs', value: 'node' },
  { key: 'c', text: 'C', value: 'c' },
  { key: 'c++', text: 'C++', value: 'c++' },
  { key: 'vue', text: 'Vue', value: 'vue' },
  { key: 'ux', text: 'UX Design', value: 'ux' },
]

const Register = () => (
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
      <Form style={{ paddingTop: '2rem' }}>
        <Form.Input label="Name" type="text" placeholder="John Doe" />
        <br/>
        <Form.Input label="Email" type="email" placeholder="example@example.com" />
        <br/>
        <Form.Input label="Password" type="password" placeholder="*******" />
        <br/>
        <div style={{width: '100%', display: 'flex'}}>
          <div style={{width: '35%'}}>
        <Form.Select
          fluid
          label="Year"
          options={options}
          placeholder="Year"
        />
        </div>
        <br/>
        <div style={{width: '65%', paddingLeft: '2rem'}}>
        <Form.Input label="Major" type="text" placeholder="Major" />
        </div>

        </div>
        <br/><br/>
        <Form.Select label="Skills" placeholder='Skills' fluid multiple search selection options={skillOptions} />
        <br/><br/>
        <Form.Button style={{ marginBottom: '4rem' }}>Sign Up</Form.Button>

      </Form>
    </div>
    <div style={{ width: '22%' }} />
    <div style={{ width: '48%', paddingTop: '5rem' }} className="ui centered image">
      <Image class="ui centered image" src={registerImage} size="large" />
    </div>
  </div>
);

export default Register;
