import React from 'react';
import {Label, Icon, List, Card} from 'semantic-ui-react';

class Profile extends React.Component {
    render() {
        return (
    <div>
        <Card fluid header='Name' />
        <Card>
            <Card.Content>
                <Card.Header>Name</Card.Header>
                <Card.Meta>Co-Worker</Card.Meta>
                <Card.Description>
                    Matthew is a pianist living in Nashville.
                </Card.Description>
            </Card.Content>
        </Card>
    <Label>
        <Icon name='email' /> Email
    </Label>
    <Label>
        <Icon name='year' /> Year
    </Label>
    <Label>
       <Icon name='major' /> Major
    </Label>

    <Label>
        <Icon name='projects' /> My Projects
    </Label>
    <List>
        <List.Item>Apples</List.Item>
        <List.Item>Pears</List.Item>
        <List.Item>Oranges</List.Item>
    </List>  

    <Label>
        <Icon name='jobs' /> Jobs Applied To
    </Label> 
    <List>
        <List.Item>Apples</List.Item>
        <List.Item>Pears</List.Item>
        <List.Item>Oranges</List.Item>
    </List>  
    </div>
        );
    }
}

export default Profile;