import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import projectAPI from '../../api/project';

class ProjectEdit extends React.Component {
  state={
    projectName: '',
    projectDescription: '',
    submission: {
      projectName: '',
      projectDescription: '',
    },
  };

  componentDidMount() {
    this.checkForExistingproject();
  }

  checkForExistingproject() {
    const { id } = this.props.match.params;
    if (id != undefined || id != null || id != '') {
      const projectResponse = projectAPI.get('/', { params: { id } });
      const { title, description } = projectResponse.data;
      this.setState({ projectName: title, projectDescription: description });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { projectName, projectDescription } = this.state;
    const submission = { projectName, projectDescription };
    this.setState({ submission });
  }

  render() {
    const { projectName, projectDescription, submission } = this.state;

    return (
      <div>
        <h1>Project Edit</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Project Name"
            placeholder="Project Name"
            name="projectName"
            value={projectName}
            onChange={this.handleChange}
          />

          <Form.Input
            label="Description"
            placeholder="Description"
            name="projectDescription"
            value={projectDescription}
            onChange={this.handleChange}
          />

          <Form.Group>
            <Button content="save" type="submit" />
          </Form.Group>
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
// needs to be made dynamic with a for loop
// each should have a 3 buttons next to it
