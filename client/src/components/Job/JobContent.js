import React from 'react';
import { Card, Header, Label } from 'semantic-ui-react';
import JobCard from './JobCard';
import projectAPI from '../../api/project';
import jobAPI from '../../api/job';
import Project from '../../model/Project';
import Job from '../../model/Job';
import Filter from './Filter';

/**
 * represents a job listing page for a given project ID.
 *
 * <JobContent project_id: project_id/>
 */
class JobContent extends React.Component {
    state = {
      project: { title: '', description: '' }, jobs: [], skills: {}, selectedSkills: [],
    };

    componentDidMount() {
      this.fetchJobs();
    }

    handleSkillsChanged = (event, { value }) => {
      this.setState({ selectedSkills: value });
    };

    async fetchJobs() {
      try {
        const { id: projectId } = this.props.match.params;
        const projectResponse = await projectAPI.get('/', { params: { id: projectId } });
        const { id, title, description } = projectResponse.data;
        const project = new Project(id, title, description);
        const jobResponse = await jobAPI.get('/project', { params: { project_id: projectId } });
        const jobs = jobResponse.data
          .map((jobData) => new Job(jobData.projectId, jobData.id, jobData.title, jobData.payment, jobData.timeCommitment));
        const skills = {};
        for (const job of jobs) {
          const skillResponse = await jobAPI.get('/skills', { params: { job_id: job.id } });
          skills[job.id] = skillResponse.data;
        }
        this.setState({ project, jobs, skills });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      const { title, description } = this.state.project;
      const matchingJobIDs = Object.keys(this.state.skills)
        .filter((key) => {
          const value = this.state.skills[key];
          return value.some((skill) => this.state.selectedSkills.includes(skill));
        })
        .reduce((res, key) => key, []);
      const matchingJobs = this.state.jobs.filter((job) => matchingJobIDs.includes(job.id));
      const jobs = this.state.selectedSkills.length === 0 ? this.state.jobs : matchingJobs;
      return (
        <div>
          <Header>{ title }</Header>
          <Label>{ description }</Label>
          <Filter skillsChanged={this.handleSkillsChanged} />
          <Card.Group>
            { jobs.map((job) => <JobCard job={job} />) }
          </Card.Group>
        </div>
      );
    }
}

export default JobContent;
