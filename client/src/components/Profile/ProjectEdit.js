import React from 'react';
// import project from './../api/project';
// import Project from './../model/Project';
import {Form, Image} from 'semantic-ui-react';

const ProjectEdit = () => (
    <div
      style={{
        marginTop: '5rem',
        marginBottom: '5rem',
        marginLeft: '10rem',
        marginRight: '10rem',
        textAlign: 'left'
      }}
    >
        <h1>Project Edit</h1>
        <Form style={{ paddingTop: '2rem' }}>
          <Form.Input label="Project Name" type="text" placeholder="Project Name" />
          <br/>
          <Form.TextArea label="Description" type="text" placeholder="This is a description" />
          <br/>
          <Form.Button style={{ marginBottom: '4rem' }}>Finish</Form.Button>
        </Form>
      </div>
  );

export default ProjectEdit;


    // <div>
    // <Label>
    //     <Icon name='p-name' /> Project Name
    // </Label>
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>
    // <Label>
    //     <Icon name='j-name' /> Description
    // </Label>
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>

    // <Label>
    //     <Icon name='jobs' /> Project Jobs
    // </Label> 
//needs to be made dynamic with a for loop
//each should have a 3 buttons next to it
