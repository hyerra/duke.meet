import React from 'react';
import {
  Modal, Card, Button, Message,
} from 'semantic-ui-react';
import jobAPI from '../../api/job';
import Job from '../../model/Job';
import JobCard from '../Job/JobCard';
import JobEdit from './JobEdit';

class JobManageModal extends React.Component {
    state = { jobs: [] };

    componentDidMount() {
      this.fetchJobs();
    }

    fetchJobs = async () => {
      try {
        const { project } = this.props;
        const { id } = project;
        const jobResponse = await jobAPI.get('/project', { params: { project_id: id } });
        const jobs = jobResponse.data
          .map((jobData) => new Job(jobData.projectId, jobData.id, jobData.title, jobData.payment, jobData.timeCommitment));
        console.log(jobs);
        this.setState({ jobs });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      const { project } = this.props;
      const { jobs } = this.state;
      return (
        <Modal trigger={<Button>See Jobs</Button>} closeIcon>
          <Modal.Content>
            {
                        jobs.length !== 0
                          ? (
                            <Card.Group>
                              { jobs.map((job) => <JobCard reloadHandler={this.fetchJobs} project={project} isEditable job={job} />) }
                            </Card.Group>
                          )
                          : (
                            <Message>
                              <Message.Header>No Job Postings</Message.Header>
                              <p>
                                Try posting some more jobs and check back here!
                              </p>
                            </Message>
                          )
                    }
          </Modal.Content>
          <Modal.Content>
            <JobEdit reloadHandler={this.fetchJobs} project={project} purpose="add" />
          </Modal.Content>
        </Modal>
      );
    }
}

export default JobManageModal;
