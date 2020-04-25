import React from 'react';
import { Card, Header} from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import project from '../../api/project';
import Project from '../../model/Project';
import '../Styling.css';
import Filter from './Filter.js';

class ProjectContent extends React.Component {
    state = { projects: [] };

    componentDidMount() {
      this.fetchProjects();
    }

    async fetchProjects() {
      try {
        const projectResponse = await project.get('/');
        const projects = projectResponse.data.map((projectData) => new Project(projectData.id, projectData.title, projectData.description));
        this.setState({ projects });
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return (
        <div> 
          <Header> Projects Posted </Header>
          <br></br>
          <br></br>
          <Filter></Filter>
          <br></br>
          <br></br>
          <Card.Group centered>
            { this.state.projects.map((project) => <ProjectCard project={project} />) }
          </Card.Group>
        </div>
      );
    }
}

export default ProjectContent;
