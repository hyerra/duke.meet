import React from 'react';
import {List, Grid, Card, Button, GridColumn, CardGroup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
    render() {
        return (
            <div>
                <Card fluid header='Name' />

                <br /><br />

                <ProfileInfo/>

                <br /><br />

                <ProfileProjects/>

                <ProfileJobs/>
            </div>
        );
    }
}

const ProfileInfo = () => {
    return (
        <Card centered>
            <Card.Content>
                <Card.Header>Major</Card.Header>
                <Card.Meta>Email</Card.Meta>
                <Card.Description>Year</Card.Description>
            </Card.Content>
        </Card>
    );
}

const ProfileProjects = ({projects}) => {
    return (
        <div>
            <Card fluid header='My Projects' />

            <List>
                <List.Item>
                    <CardGroup>

                    </CardGroup>
                    <List.Item> <Button content='Add Project' animated as={Link}
                        to={'ProjectEdit'} /></List.Item>
                </List.Item>
            </List>
        </div>
    );
}

const ProfileJobs = () => {
    return (
        <div>
            <Card fluid header='My Jobs' />

            <List>
                <List.Item>
                    <Button content='Edit -job 1- ' size='tiny' animated as={Link}
                        to={'/JobEdit'} />
                    <br /> <br />
                    <List.Item> <Button content='Add Job' animated as={Link}
                        to={'JobEdit'} /></List.Item>
                </List.Item>
            </List>
        </div>
    );
}

export default Profile;