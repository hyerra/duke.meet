import React from 'react';
import {Button, Form, Label} from 'semantic-ui-react';

class ApplicationForm extends React.Component {
    state = { info:'', submittedInfo:''}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { info } = this.state

        this.setState({ submittedInfo: info })
    }

    render() {
        const { info, submittedInfo } = this.state

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.TextArea
                        placeholder='Tell us about yourself.'
                        name='info'
                        fluid
                        value={info}
                        onChange={this.handleChange}
                    />
                    <Form.Button content='Submit' />
                </Form>
                <strong>FORM:</strong>
                <pre>{JSON.stringify({ info, submittedInfo }, null, 2)}</pre>
            </div>
        )
    }
}

export default ApplicationForm;