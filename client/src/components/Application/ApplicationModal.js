import React from 'react';
import { Modal, Button, ModalContent } from 'semantic-ui-react';
import JobCard from './../Job/JobCard'
import ApplicationForm from './ApplicationForm';

const ApplicationModal = ({job}) => (
    <Modal trigger={<Button>Apply</Button>}>
        <ModalContent>
            <JobCard job={job} />
        </ModalContent>
        <ModalContent>
            <ApplicationForm/>
        </ModalContent>
    </Modal>
);

export default ApplicationModal