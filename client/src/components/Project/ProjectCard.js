import { Button, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

const ProjectCard = ({ project }) => (
  <Card>
    <Card.Content>
      <Card.Header>{project.title}</Card.Header>
      <Card.Description>{project.description}</Card.Description>
      <Button style={{ width: '80%' }} animated>
        <Button.Content visible>Apply</Button.Content>
        <Button.Content hidden as={Link} to={`/projects/${project.id}`}>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </Card.Content>
  </Card>
);

export default ProjectCard;
