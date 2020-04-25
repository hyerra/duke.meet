import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import MainContent from './Home/MainContent';
import ProjectContent from './Project/ProjectContent';
import './App.css';

const App = props => {
    return (
        <Router>
            <Container>
                <div className='main-content'>
                    <NavigationBar />
                    <Switch>
                        <Route path='/' exact component={MainContent} />
                        <Route path='/projects' component={ProjectContent} />
                    </Switch>
                </div>
            </Container>
        </Router>
    );
};

export default App;
