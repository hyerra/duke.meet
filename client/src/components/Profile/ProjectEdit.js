import React from 'react';
import {Label,Icon, List} from 'semantic-ui-react';


class ProjectEdit extends React.Component {
    render() {
        return (
    <div>
    <Label>
        <Icon name='p-name' /> Project Name
    </Label>
    <div class="ui input">
        <input type="text" placeholder="Enter..."/>
    </div>
    <Label>
        <Icon name='j-name' /> Description
    </Label>
    <div class="ui input">
        <input type="text" placeholder="Enter..."/>
    </div>

    <Label>
        <Icon name='jobs' /> Project Jobs
    </Label> 
//needs to be made dynamic with a for loop
//each should have a 3 buttons next to it
    <List>
        <List.Item>Apples</List.Item>
        <List.Item>Pears</List.Item>
        <List.Item>Oranges</List.Item>
    </List>  

    </div>
        );
    }
}

export default ProjectEdit;