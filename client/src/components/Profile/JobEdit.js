import React from 'react';
import {
  Modal, Button, Form, ModalContent,
} from 'semantic-ui-react';
import jobAPI from '../../api/job';
import DropdownSkillsSelection from '../Job/DropdownSkillsSelection';

class JobEdit extends React.Component {
    state = {
      modalOpen: false,
      title: '',
      payment: '',
      timeCommitment: '',
      skills: [],
      loading: false,
    };

    componentDidMount() {
      const { purpose } = this.props;
      if (purpose === 'edit') {
        const { title, payment, timeCommitment } = this.props.job;
        this.setState({ title, payment, timeCommitment });
      }
    }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSkillsChanged = (e, { value }) => this.setState({ skills: value });

    handleSubmit = async () => {
      const {
        title, payment, timeCommitment, skills,
      } = this.state;
      this.setState({ loading: true });

      const { purpose, reloadHandler } = this.props;
      let jobID;

      if (purpose === 'edit') {
        const { job } = this.props;
        const { id } = job;
        jobID = id;
        await jobAPI.put('/', {
          id, title, payment, time_commitment: timeCommitment,
        });
      }
      if (purpose === 'add') {
        const { project } = this.props;
        const { id } = project;
        try {
          const response = await jobAPI.post('/', {
            project_id: id, title, payment, time_commitment: timeCommitment,
          });
          jobID = response.data.id;
        } catch (error) {
          console.log(error);
        }
      }

      await jobAPI.post('/skills', { skills, job_id: jobID });
      this.setState({ loading: false });
      reloadHandler();

      this.handleClose();
    };

    render() {
      const {
        modalOpen, title, payment, timeCommitment, loading,
      } = this.state;
      const { purpose } = this.props;

      return (
        <Modal
          trigger={(
            <Button onClick={this.handleOpen} style={{ marginBottom: '1rem' }} onClick={this.handleOpen}>
              {purpose === 'edit' ? 'Edit' : 'Add'}
              {' '}
              Job
            </Button>
              )}
          open={modalOpen}
          onClose={this.handleClose}
          closeIcon
        >
          <ModalContent>
            <h1>{ purpose === 'edit' ? 'Edit Job' : 'Add Job' }</h1>
          </ModalContent>
          <ModalContent>
            <Form loading={loading} onSubmit={this.handleSubmit}>
              <Form.Input
                label="Job Title"
                placeholder="Software Engineer"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Payment"
                placeholder="5.00"
                name="payment"
                value={payment}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Time Commitment"
                placeholder="20 hrs/week"
                name="timeCommitment"
                value={timeCommitment}
                onChange={this.handleChange}
              />
              <DropdownSkillsSelection skillsChanged={this.handleSkillsChanged} />
              <div style={{ marginBottom: '1rem' }} />
              <Form.Button content="Save" />
            </Form>
          </ModalContent>
        </Modal>
      );
    }
}


export default JobEdit;
