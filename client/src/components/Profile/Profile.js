import React from 'react';
import {List, Grid, Card, Button, GridColumn, CardGroup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Project from '../../model/Project';
import ProjectCard from '../Project/ProjectCard';

class Profile extends React.Component {
    state = {projects:[]};

    componentDidMount() {
        this.fetchUserProjects();
    }

    fetchUserProjects() {
        const projects = [
            new Project(100,100,"1"),
            new Project(200,200,"2"),
        ];
        this.setState({projects:projects});
    }

    render() {
        return (
            <div>
                <Card fluid header='Name' />

                <br /><br />

                <ProfileInfo/>

                <br /><br />

                <ProfileProjects projects={this.state.projects}/>

                <ProfileJobs/>
            </div>
        );
    }
}

const ProfileInfo = () => {
    return (
        <Card centered>
            <Card.Content>
                <Card.Header>Major</Card.Header>
                <Card.Meta>Email</Card.Meta>
                <Card.Description>Year</Card.Description>
            </Card.Content>
        </Card>
    );
}

const ProfileProjects = ({projects}) => {
    return (
        <div>
            <Card fluid header='My Projects' />

            <Card.Group>
                {projects.map((project) => <ProjectCard project={project}/>)}
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