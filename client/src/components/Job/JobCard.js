import { Card, Icon } from 'semantic-ui-react';
import React from 'react';

const JobCard = ({ job }) => (
  <Card>
    <Card.Content>
      <Card.Header>{job.title}</Card.Header>
    </Card.Content>
    <Card.Content>
      <Card.Meta>
        <Icon name="dollar sign" />
        {job.payment}
      </Card.Meta>
      <Card.Meta>
        <Icon name="clock" />
        {job.timeCommitment}
      </Card.Meta>
    </Card.Content>
  </Card>
);

export default JobCard;
