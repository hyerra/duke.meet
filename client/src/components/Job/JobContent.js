import React from 'react';
import { Card, Header, Label } from 'semantic-ui-react';
import JobCard from './JobCard';
import projectAPI from '../../api/project';
import job from '../../api/job';
import Project from '../../model/Project';
import Job from '../../model/Job';

/**
 * represents a job listing page for a given project ID.
 *
 * <JobContent project_id: project_id/>
 */
class JobContent extends React.Component {
    state = { project: { title: '', description: '' }, jobs: []};

    componentDidMount() {
      this.fetchJobs();
    }

    async fetchJobs() {
      try {
        const { id: projectId } = this.props.match.params;
        const projectResponse = await projectAPI.get('/', { params: { id: projectId } });
        const { id, title, description } = projectResponse.data;
        const project = new Project(id, title, description);
        const jobResponse = await job.get('/project', { params: { project_id: projectId } });
        const jobs = jobResponse.data
          .map((jobData) => new Job(jobData.projectId, jobData.id, jobData.title, jobData.payment, jobData.timeCommitment));
        this.setState({ project, jobs });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      const { title, description } = this.state.project;
      return (
        <div>
          <Header>{ title }</Header>
          <Label>{ description }</Label>
          <Card.Group>
            { this.state.jobs.map((job) => <JobCard job={job} mayApply={true}/>) }
          </Card.Group>
        </div>
      );
    }
}

export default JobContent;
