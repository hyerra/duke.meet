import React from 'react';
// import project from './../api/project';
import Project from '../../model/Project';
import {Form, Image, Button} from 'semantic-ui-react';
import User from '../../model/User';
import userAPI from '../../api/user';

class ProjectEdit extends React.Component {
  state={
    projectName:'',
    projectDescription:'',
    submission:{
      projectName: '',
      projectDescription: '',
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { projectName, projectDescription } = this.state;
    const submission = { projectName:projectName, projectDescription:projectDescription };
    this.setState({ submission: submission });
  }

  render() {
    const {projectName, projectDescription, submission} = this.state;

    return (
      <div>
        <h1>Project Edit</h1>
        
        <Form onSubmit={this.handleSubmit} style={{ paddingTop: '2rem' }}>
          <Form.Input 
            label="Project Name"
            placeholder="Project Name" 
            value={projectName}
            onChange={this.handleChange}
          />

          <Form.Input
            label="Description" 
            placeholder="This is a description" 
            value={projectDescription}
            onChange={this.handleChange}
          />

          <Button type='submit' style={{ marginBottom: '4rem' }}>Finish</Button>
        </Form>
        <strong>FORM:</strong>
        <pre>{JSON.stringify({ projectName, projectDescription }, null, 2)}</pre>
        <strong>SUBMITTED:</strong>
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </div>
    );
  }
}



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
