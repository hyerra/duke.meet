import React from 'react';
import {Dropdown} from 'semantic-ui-react';


const options = [
    { key: 'Software Engineer (Full Stack)', text: 'Software Enginner (Full Stack)', value: 'Software Engineer (Full Stack)' },
    { key: 'Back End Developer', text: 'Back End Developer', value: 'Back End Developer' },
    { key: 'Lead Developer', text: 'Lead Developer', value: 'Lead Developer' },
    { key: 'Front End', text: 'Front End', value: 'Front End' },
  ]
  
  const DropdownExampleMultipleSelection = () => (
    <Dropdown placeholder='Job filtering options' fluid multiple selection options={options} />
  );
  
  export default DropdownExampleMultipleSelection;