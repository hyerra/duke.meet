import React from 'react';
import {List, Grid, Card, Button, GridColumn, CardGroup} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import Project from '../../model/Project';
import ProjectCard from '../Project/ProjectCard';
import appAPI from '../../api/application';
import userAPI from '../../api/user';
import jobAPI from '../../api/job';
import Application from '../../model/Application';
import User from '../../model/User';

class Profile extends React.Component {
    state = {projects: [], user: User, applications: [] };

    componentDidMount() {
        this.fetchUserProjects();
    }

    async fetchUserProjects() {

        const projects = [
            new Project(100,100,"h","h")
        ];

        const userResponse = await userAPI.get('/');

        const { id, name, email, major, year, hash } = userResponse.data;
        const user = new User(id,name,email,major,year,hash);

        const appResponse = await appAPI.get('/user');
        const applications = appResponse.data
                .map((applicationData) => new Application(applicationData.userID, applicationData.jobID, new Date(applicationData.date), applicationData.applicationStatement));
        this.setState({ user, projects, applications });
    }

    render() {
        const { user, projects, applications } = this.state;
        return (
            <div>
                <pre>{JSON.stringify(user.major, null, 2)}</pre>

                <Card fluid header={user.name || "user " + user.id} />

                <br /><br />

                <ProfileInfo user={user}/>

                <br /><br />

                <ProfileProjects projects={projects}/>

                <Card fluid header='My Applications' />
                <Card.Group>
                {
                    applications.map(application => <ProfileApplication application={application} />)
                }
                </Card.Group>
            </div>
        );
    }
}

const ProfileInfo = ({ user }) => {
    return (
        <Card centered>
            <Card.Content>
                <Card.Header>{user.major || "No major"}</Card.Header>
                <Card.Meta>{user.email || "No email"}</Card.Meta>
                <Card.Description>{user.year | "Unspecified year"}</Card.Description>
            </Card.Content>
        </Card>
    );
}

const ProfileProjects = ({ projects }) => {
    return (
        <div>
            <Card fluid header='My Projects' />

            <Card.Group>
                {projects.map((project) => <ProjectCard project={project} as={NavLink} to='/projectedit'/>)}
            </Card.Group>

            <Button content='Add Project' animated as={Link}
                to={'ProjectEdit'} />
        </div>
    );
};

class ProfileApplication extends React.Component {
    state = { jobTitle: '' };

    componentDidMount() {
        this.fetchJob();
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

    render() {
        const { date, applicationStatement } = this.props.application;
        return (
            <Card
                header={this.state.jobTitle}
                meta={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
                description={applicationStatement}
            />
        );
    }
};

export default Profile;