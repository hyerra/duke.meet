import React from 'react';
import {Card, Message} from 'semantic-ui-react';
import Project from '../../model/Project';
import ViewApplicationModal from '../Project/ViewApplicationModal';
import ApplicationCard from '../Application/ApplicationCard';
import appAPI from '../../api/application';
import userAPI from '../../api/user';
import projectAPI from '../../api/project';
import Application from '../../model/Application';
import User from '../../model/User';
import ProjectEdit from './ProjectEdit';
import JobManageModal from './JobManageModal';

class Profile extends React.Component {
    state = { projects: [], user: User, applications: [] };

    componentDidMount() {
      this.fetchUser();
      this.fetchProjects();
      this.fetchApplications();
    }

    fetchUser = async () => {
      const userResponse = await userAPI.get('/');
      const {
        id, name, email, major, year,
      } = userResponse.data;
      const user = new User(id, name, email, major, year);
      this.setState({ user });
    };

    fetchProjects = async () => {
      const projectIDResponse = await userAPI.get('/projects');

      Promise.all(projectIDResponse.data.map((projectID) => projectAPI.get('/', { params: { id: projectID } })))
        .then((projectsResponse) => {
          const projects = projectsResponse.map((projectResponse) => {
            const { data: project } = projectResponse;
            return new Project(project.id, project.title, project.description);
          });
          this.setState({ projects });
        })
        .catch((error) => console.log(error));
    };

    fetchApplications = async () => {
      const appResponse = await appAPI.get('/user');
      const applications = appResponse.data
        .map((applicationData) => new Application(applicationData.userID, applicationData.jobID, new Date(applicationData.date), applicationData.applicationStatement));
      this.setState({ applications });
    };

    render() {
      const { user, projects, applications } = this.state;
      return (
        <div>
          <Card fluid header={user.name || `user ${user.id}`} />

          <br />
          <br />

          <ProfileInfo user={user} />

          <br />
          <br />

            <Card fluid header="My Projects" />
            {
                projects.length !== 0 ?
                    <Card.Group style={{ marginBottom: '1rem' }}>
                        {projects.map((project) => <ProjectManageCard project={project} reloadHandler={this.fetchProjects} />)}
                    </Card.Group> :
                    <Message style={{ marginBottom: '1rem' }}>
                        <Message.Header>No Projects</Message.Header>
                        <p>
                            Try creating some projects!
                        </p>
                    </Message>
            }
            <ProjectEdit reloadHandler={this.fetchProjects} purpose="add" />

            <Card fluid header="My Applications" />
            {
                applications.length !== 0 ?
                    <Card.Group style={{ marginBottom: '1rem' }}>
                        { applications.map((application) => <ApplicationCard shows="job" application={application} />) }
                    </Card.Group> :
                    <Message style={{ marginBottom: '1rem' }}>
                        <Message.Header>No Applications</Message.Header>
                        <p>
                            Try applying to some positions!
                        </p>
                    </Message>
            }
        </div>
      );
    }
}

const ProfileInfo = ({ user }) => (
  <Card centered>
    <Card.Content>
      <Card.Header>{user.major || 'No major'}</Card.Header>
      <Card.Meta>{user.email || 'No email'}</Card.Meta>
      <Card.Description>{user.year || 'Unspecified year'}</Card.Description>
    </Card.Content>
  </Card>
);

const ProjectManageCard = ({ project, reloadHandler }) => (
  <Card>
    <Card.Content>
      <Card.Header>{project.title}</Card.Header>
      <Card.Description>{project.description}</Card.Description>
      <ProjectEdit reloadHandler={reloadHandler} project={project} purpose="edit" />
      <JobManageModal project={project} />
      <ViewApplicationModal project={project} />
    </Card.Content>
  </Card>
);

export default Profile;
