import {Button, Card, Icon} from 'semantic-ui-react';
import React from 'react';

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

export default ProjectCard;
