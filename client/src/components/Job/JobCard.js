import {Card, Icon} from 'semantic-ui-react';
import React from 'react';

const JobCard = props => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.job.title}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Meta> <Icon name='dollar sign' />  {props.job.payment}</Card.Meta>
                <Card.Meta> <Icon name='clock' /> {props.job.timeCommitment}</Card.Meta>
            </Card.Content>
        </Card>
    )
};

export default JobCard;