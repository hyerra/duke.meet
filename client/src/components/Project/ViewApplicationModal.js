import React from 'react';
import { Card, Button, Message, Modal, ModalContent } from 'semantic-ui-react';
import applicationAPI from '../../api/application';
import Application from '../../model/Application';
import ApplicationCard from '../Application/ApplicationCard';

class ViewApplicationModal extends React.Component {
    state = { applications: [] };

    componentDidMount() {
        this.fetchProjects();
    }

    async fetchProjects() {
        try {
            const { project } = this.props;
            const applicationsResponse = await applicationAPI.get('/project', { params: { project_id: project.id } })
            const applications = applicationsResponse.data
                .map((applicationData) => new Application(applicationData.userID, applicationData.jobID, new Date(applicationData.date), applicationData.applicationStatement));
            this.setState({ applications })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { applications } = this.state;
        console.log(applications);
        return (
            <Modal trigger={<Button>See Applications</Button>} closeIcon>
                <ModalContent>
                    <h2>Applicants</h2>
                    {
                        applications.length !== 0 ?
                            <Card.Group>
                                { applications.map((application) => <ApplicationCard shows='applicant' application={application} />) }
                            </Card.Group> :
                            <Message>
                                <Message.Header>No Applications</Message.Header>
                                <p>
                                    There aren't any applications for you to see yet. Spread the word about your opportunity and check back later!
                                </p>
                            </Message>
                    }
                </ModalContent>
            </Modal>
        );
    }
}

export default ViewApplicationModal;