import { Card, Icon } from 'semantic-ui-react';
import React from 'react';
import ApplicationModal from '../Application/ApplicationModal';
import JobEdit from '../Profile/JobEdit';

const JobCard = ({
  project, reloadHandler, job, isLoggedIn, isEditable, mayApply = false,
}) => (
  <Card>
    <Card.Content>
      <Card.Header>{job.title}</Card.Header>
    </Card.Content>
    <Card.Content>
      <JobPayment job={job} />
      <JobTimeCommitment job={job} />
      <br />
      {
        mayApply && isLoggedIn && <ApplicationModal job={job} />
      }
      {
            isEditable && <JobEdit reloadHandler={reloadHandler} project={project} purpose="edit" job={job} />
        }
    </Card.Content>
  </Card>
);

const JobTimeCommitment = ({ job }) => (
  <Card.Meta>
    <Icon name="clock" />
    {`${Math.round(job.timeCommitment)} hrs/week`}
  </Card.Meta>
);

const JobPayment = ({ job }) => (
  <Card.Meta>
    <Icon name="dollar sign" />
    {`${job.payment} compensation`}
  </Card.Meta>
);

export default JobCard;
