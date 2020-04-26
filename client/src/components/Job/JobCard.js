import { Button, Card, Icon, Modal, ModalDescription, ModalContent, CardContent, CardHeader } from 'semantic-ui-react';
import ApplicationModal from './../Application/ApplicationModal'
import React from 'react';

const isLoggedIn=true

const JobCard = ({ job , mayApply=false}) => (
  <Card>
    <Card.Content>
      <Card.Header>{job.title}</Card.Header>
    </Card.Content>
    <Card.Content>
      <JobPayment job={job}/>
      <JobTimeCommitment job={job}/>
      <br/>
      { 
        (mayApply && isLoggedIn) &&
        <ApplicationModal job={job}/>
      }
    </Card.Content>
  </Card>
);

const JobTimeCommitment = ({job}) => (
  <Card.Meta>
    <Icon name="clock" />
    {job.timeCommitment}
  </Card.Meta>
);

const JobPayment = ({job}) => (
  <Card.Meta>
    <Icon name="dollar sign" />
    {job.payment}
  </Card.Meta>
);

export default JobCard;
