import React from 'react';
import {Button, Form, Label} from 'semantic-ui-react';

class ApplicationForm extends React.Component {
    state = {info:'', submittedInfo:''}

    handleSubmit = () => {
        const info = this.state.info;

        this.setState({submittedInfo:info});
    }

    handleChange = (e, {info})  => {
        this.setState({info:info})
    }

    render() { 
        const {info} = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input 
                        label='Tell us about yourself' 
                        name='application'
                        value={info}
                        placeholder=''
                        onChange={this.handleChange}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default ApplicationForm;