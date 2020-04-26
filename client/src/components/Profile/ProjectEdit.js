import React from 'react';
import {Form, Button, Modal, ModalContent} from 'semantic-ui-react';
import projectAPI from '../../api/project';

class ProjectEdit extends React.Component {

  state = { modalOpen: false, title: '', description: '' };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentDidMount() {
    const { purpose } = this.props;
    if (purpose === 'edit') {
      const { title, description } = this.props.project;
      this.setState({ title, description });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { title, description } = this.state;
    const { purpose } = this.props;
    if (purpose === 'edit') {
      const { project } = this.props;
      const { id } = project;
      projectAPI.put('/', { id, title, description } );
    }
    if (purpose === 'add') projectAPI.post('/',  { title, description });
    this.handleClose();
  };

  render() {
    const { modalOpen, title, description } = this.state;
    const { purpose } = this.props;

    return (
        <Modal trigger={<Button onClick={this.handleOpen} style={{ marginBottom: '1rem' }} onClick={this.handleOpen}>{purpose === 'edit' ? 'Edit' : 'Add'} Project</Button>} open={modalOpen} onClose={this.handleClose} closeIcon>
          <ModalContent>
            <h1>Project Edit</h1>
          </ModalContent>
          <ModalContent>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Project Name"
            placeholder="Project Name"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <Form.Input
            label="Description"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <Form.Button content="Save" />
        </Form>
          </ModalContent>
        </Modal>
    );
  }
}

export default ProjectEdit;