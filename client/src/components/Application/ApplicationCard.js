import React from 'react';
import jobAPI from '../../api/job';
import userAPI from '../../api/user';
import {Card} from 'semantic-ui-react';

class ApplicationCard extends React.Component {
    state = { jobTitle: '', applicantName: '' };

    componentDidMount() {
        const { shows } = this.props;
        if (shows === 'job') this.fetchJob();
        if (shows === 'applicant') this.fetchApplicant();
    }

    async fetchJob() {
        try {
            const { jobID } = this.props.application;
            const jobResponse = await jobAPI.get('/details', { params: { job_id: jobID } });
            this.setState({ jobTitle: jobResponse.data.title });
        } catch (error) {
            console.log(error);
        }
    }

    async fetchApplicant() {
        try {
            const { userID } = this.props.application;
            const userResponse = await userAPI.get('/', { params: { id: userID } });
            this.setState({ applicantName: userResponse.data.name })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { shows, application } = this.props;
        const { date, applicationStatement } = application;
        return (
            <Card
                header={shows === 'job' ? this.state.jobTitle : this.state.applicantName}
                meta={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
                description={applicationStatement}
            />
        );
    }
}

export default ApplicationCard;