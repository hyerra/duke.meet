import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
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

export default ProjectContent;