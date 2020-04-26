//Job(project_id, id, title, payment, time_commitment)


import React from 'react';
import {Label,Icon} from 'semantic-ui-react';


class Job extends React.Component {
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
        <Icon name='j-mail' /> Job Name
    </Label>
    <div class="ui input">
        <input type="text" placeholder="Enter..."/>
    </div>
    <Label>
        <Icon name='payment' /> Payment
    </Label>
    <div class="ui input">
        <input type="text" placeholder="Enter..."/>
    </div>
    <Label>
       <Icon name='time-c' /> Time Commitment
    </Label> 
    <div class="ui input">
        <input type="text" placeholder="Enter..."/>
    </div>

    </div>
        );
    }
}

export default Job;