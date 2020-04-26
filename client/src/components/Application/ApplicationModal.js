import React from 'react';
import {
  Modal, Button, ModalContent, Form,
} from 'semantic-ui-react';
import JobCard from '../Job/JobCard';
import applicationAPI from '../../api/application';

class ApplicationModal extends React.Component {
    state = { modalOpen: false, applicationStatement: '' };

    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
      const { applicationStatement } = this.state;
      applicationAPI.post('/', { job_id: this.props.job.id, application_statement: applicationStatement })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      this.handleClose();
    };

    render() {
      const { job } = this.props;
      const { modalOpen, applicationStatement } = this.state;
      return (
        <Modal trigger={<Button onClick={this.handleOpen}>Apply</Button>} open={modalOpen} onClose={this.handleClose}>
          <ModalContent>
            <JobCard job={job} />
          </ModalContent>
          <ModalContent>
            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea
                placeholder="Tell us about yourself."
                name="applicationStatement"
                fluid
                value={applicationStatement}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit" />
            </Form>
          </ModalContent>
        </Modal>
      );
    }
}

export default ApplicationModal;
