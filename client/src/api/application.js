import axios from 'axios';

export default axios.create({
    baseURL: '/api/application',
});

// .get('/user) to get all the applications from the logged-in user.