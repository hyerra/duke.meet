import React from 'react';
import {Dropdown} from 'semantic-ui-react';


const options = [
    { key: 'SQL', text: 'SQL', value: 'SQL' },
    { key: 'Java', text: 'Java', value: 'Java' },
    { key: 'Python', text: 'Python', value: 'Python' },
    { key: 'Web Development', text: 'Web Development', value: 'Web Development' },
    { key: 'C', text: 'C', value: 'C' },
    { key: 'C++', text: 'C++', value: 'C++' },
    { key: 'C#', text: 'C#', value: 'C#' },
    { key: 'React', text: 'React', value: 'React' },
    { key: 'Node.js', text: 'Node.js', value: 'Node.js' },
    { key: 'Objective-C', text: 'Objective-C', value: 'Objective-C' },
    { key: 'UX Design', text: 'UX Design', value: 'UX Design' },
    { key: 'HTML', text: 'HTML', value: 'HTML' },
    { key: 'CSS', text: 'CSS', value: 'CSS' },
    { key: 'Javascript', text: 'Javascript', value: 'Javascript' },
    { key: 'PHP', text: 'PHP', value: 'PHP' },
    { key: 'Perl', text: 'Perl', value: 'Perl' },
    { key: 'XML', text: 'XML', value: 'XML' },
    { key: 'Swift', text: 'Swift', value: 'Swift' },
    { key: 'Android SDK', text: 'Android SDK', value: 'Android SDK' },
    { key: 'Product Management', text: 'Product Management', value: 'Product Management' },
    { key: 'Angular', text: 'Angular', value: 'Angular' },
    { key: 'Flask', text: 'Flask', value: 'Flask' },
    { key: 'Git', text: 'Git', value: 'Git' },
  ]
  
  const DropdownExampleMultipleSelection = () => (
    <Dropdown placeholder='Filter by skills' fluid multiple selection options={options} />
  );
  
  export default DropdownExampleMultipleSelection;