import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import project from '../../api/project';
import Project from '../../model/Project';

class ProjectContent extends React.Component {
    state = {projects: []};

    componentDidMount() {
        this.fetchProjects();
    }

    async fetchProjects() {
        try {
            const projectResponse = await project.get('/');
            const projects = projectResponse.data.map(projectData => new Project(projectData.id, projectData.title, projectData.description));
            this.setState({ projects: projects });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Card.Group>
                    { this.state.projects.map(project => <ProjectCard project={project} />) }
            </Card.Group>
        );
    }
}

const ProjectCard = props => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.project.title}</Card.Header>
                <Card.Description>{props.project.description}</Card.Description>
                <Button style={{width: '80%'}} animated>
                    <Button.Content visible>Apply</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ProjectContent;