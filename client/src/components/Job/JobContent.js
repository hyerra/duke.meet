import React from 'react';
import { Icon, Card, Header, Label } from 'semantic-ui-react';
import JobCard from './JobCard';
import job from '../../api/job';
import Job from '../../model/Job';

/**
 * represents a job listing page for a given project ID.
 * 
 * <JobContent project_id: project_id/>
 */
class JobContent extends React.Component {
    state = { jobs: [] };

    componentDidMount() {
        this.fetchJobs();
    }

    async fetchJobs() {
        try {
            const projectId = this.props.project.id;
            const jobResponse = await job.get('/', { params: { project_id: projectId } });
            const jobs = jobResponse.data
                .map(jobData => new Job(jobData.projectId, jobData.id, jobData.title, jobData.payment, jobData.timeCommitment));
            this.setState({ jobs: jobs });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { title, description } = this.props.project;
        return (
            <div>
                <Header>{ title }</Header>
                <Label>{ description }</Label>
                <Card.Group>
                    { this.state.jobs.map(job => <JobCard job={job} />) }
                </Card.Group>
            </div>
        );
    }
}

export default JobContent;