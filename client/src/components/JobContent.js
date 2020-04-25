import React from 'react';
import job from './../api/job';
import Job from './../model/Job';
import { Icon, Card, Header } from 'semantic-ui-react';

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

    exampleJobs() {
        return [
            new Job("0", "1", "a job title", "no payment", "180 hr/week"),
            new Job("0", "2", "the same job title, but more pretentious-sounding", "80k/yr", "just make most of the meetings lol")
        ];
    }

    async fetchJobs() {
        try {
            // const projectId = this.props.projectId;

            // // no clue if this is what it takes to get the data.
            // const jobResponse = await job.get('/');
            // const jobs = jobResponse.data
            //     .map(jobData => new Job(jobData.projectId, jobData.id, jobData.title, jobData.payment, jobData.timeCommitment))
            //     .filter(job => job.projectId===projectId);
            // this.setState({jobs: jobs});

            this.setState({jobs: this.exampleJobs()});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <Header>jobs for this project. (pretend that i've got the name here)</Header>
                <Card.Group>
                    { 
                    this.state.jobs.map(job => JobCard(job)) 
                    }
                </Card.Group>
            </div>
        );
    }
}

const JobCard = job => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{job.title}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Meta> <Icon name='dollar sign' />  {job.payment}</Card.Meta>
                <Card.Meta> <Icon name='clock' /> {job.timeCommitment}</Card.Meta>
            </Card.Content>
        </Card>
    )
};

export default JobContent