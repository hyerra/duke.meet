//Job(project_id, id, title, payment, time_commitment)

import React from 'react';
import {Button, Form} from 'semantic-ui-react';

class JobEdit extends React.Component {
    state = {
        projectName:'',
        jobName:'',
        payment:'',
        timeCommitment:'',
        submission:{ //access submission in this.handleSubmit via this.state.submission
            projectName: '',
            jobName: '',
            payment: '',
            timeCommitment: '',
        }
    };

    handleChange = (e, {name,value}) => this.setState({[name]:value});

    handleSubmit = () => {
        const { projectName, jobName, payment, timeCommitment } = this.state;
        const submission = {projectName:projectName, jobName:jobName, payment:payment, timeCommitment:timeCommitment};
        // if you can figure out a better way to copy these elements over, be my goddamn guest.

        this.setState({submission: submission});
    }

    render() {
        const { projectName, jobName, payment, timeCommitment, submission } = this.state;

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            label='Project Name'
                            placeholder='project name'
                            name='projectName'
                            value={projectName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            label='Job Name'
                            placeholder='job name'
                            name='jobName'
                            value={jobName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            label='Payment'
                            placeholder='payment'
                            name='payment'
                            value={payment}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            label='Time Commitment'
                            placeholder='time commitment'
                            name='timeCommitment'
                            value={timeCommitment}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button content='save' type='submit'/>
                    </Form.Group>
                </Form>
                
                <div style={{textAlign: "left"}}>
                    <strong>FORM:</strong>
                    <pre>{JSON.stringify({ projectName, jobName, payment, timeCommitment }, null, 2)}</pre>
                    <strong>SUBMITTED:</strong>
                    <pre>{JSON.stringify( submission , null, 2)}</pre>
                </div>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>

    // <Label>
    //     <Icon name='p-name' /> Project Name
    // </Label>
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>
    // <Label>
    //     <Icon name='j-mail' /> Job Name
    // </Label>
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>
    // <Label>
    //     <Icon name='payment' /> Payment
    // </Label>
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>
    // <Label>
    //    <Icon name='time-c' /> Time Commitment
    // </Label> 
    // <div class="ui input">
    //     <input type="text" placeholder="Enter..."/>
    // </div>

    // </div>
    //     );
}


export default JobEdit;