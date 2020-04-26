import React from 'react';
import {List, Grid, Card, Button, GridColumn, CardGroup} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import Project from '../../model/Project';
import ProjectCard from '../Project/ProjectCard';
import appAPI from '../../api/application';
import userAPI from '../../api/user';
import User from '../../model/User';

class Profile extends React.Component {
    state = {projects:[], user:User};

    componentDidMount() {
        this.fetchUserProjects();
    }

    async fetchUserProjects() {

        const projects = [
            new Project(100,100,"h","h")
        ];

        const userResponse = await userAPI.get('/');

        const {id, name, email, major, year, hash} = userResponse.data;
        const user = new User(id,name,email,major,year,hash);

        const appResponse = await appAPI.get('/user');

        console.log(appResponse.data[0])

        const userApps = appResponse.data
                .map((projectData) => new Project(projectData.id, projectData.title, projectData.description));

        this.setState({ user:user, projects:projects});
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.state.user.major, null, 2)}</pre>

                <Card fluid header={this.state.user.name || "user "+this.state.user.id} />

                <br /><br />

                <ProfileInfo user={this.state.user}/>

                <br /><br />

                <ProfileProjects projects={this.state.projects}/>

                <ProfileJobs/>
            </div>
        );
    }
}

const ProfileInfo = ({user}) => {
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

const ProfileProjects = ({projects}) => {
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
}

const ProfileJobs = () => {
    return (
        <div>
            <Card fluid header='My Jobs' />

            <List>
                <List.Item>
                    <Button content='Edit -job 1- ' size='tiny' animated as={Link}
                        to={'/JobEdit'} />
                    <br /> <br />
                    <List.Item> <Button content='Add Job' animated as={Link}
                        to={'JobEdit'} /></List.Item>
                </List.Item>
            </List>
        </div>
    );
}

export default Profile;