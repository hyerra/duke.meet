import React from 'react';
import {
  Form, Button, Modal,
} from 'semantic-ui-react';
import projectAPI from '../../api/project';

class ProjectEdit extends React.Component {
  state = {
    modalOpen: false, title: '', description: '', loading: false,
  };

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

  handleSubmit = async () => {
    const { title, description } = this.state;
    const { purpose, reloadHandler } = this.props;
    this.setState({ loading: true });
    if (purpose === 'edit') {
      const { project } = this.props;
      const { id } = project;
      await projectAPI.put('/', { id, title, description });
    }
    if (purpose === 'add') await projectAPI.post('/', { title, description });
    this.setState({ loading: false });
    reloadHandler();
    this.handleClose();
  };

  render() {
    const {
      modalOpen, title, description, loading,
    } = this.state;
    const { purpose } = this.props;

    return (
      <Modal
        trigger={(
          <Button onClick={this.handleOpen} style={{ marginBottom: '1rem' }} onClick={this.handleOpen}>
            {purpose === 'edit' ? 'Edit' : 'Add'}
            {' '}
            Project
          </Button>
)}
        open={modalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Modal.Content>
          <h1>{ purpose === 'edit' ? 'Edit Project' : 'Add Project' }</h1>
        </Modal.Content>
        <Modal.Content>
          <Form loading={loading} onSubmit={this.handleSubmit}>
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
        </Modal.Content>
      </Modal>
    );
  }
}

export default ProjectEdit;
