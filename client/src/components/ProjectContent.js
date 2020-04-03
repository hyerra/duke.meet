import React from 'react';
import { Card } from 'semantic-ui-react';
import project from './../api/project';
import Project from './../model/Project';

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
                    {
                        this.state.projects.map(project => {
                            return (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>{project.title}</Card.Header>
                                        <Card.Description>{project.description}</Card.Description>
                                    </Card.Content>
                                </Card>
                            );
                        })
                    }
            </Card.Group>
        );
    }
}

export default ProjectContent;