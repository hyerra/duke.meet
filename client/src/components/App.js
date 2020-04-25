import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavigationBar from './NavigationBar';
import MainContent from './Home/MainContent';
import ProjectContent from './Project/ProjectContent';
import JobContent from './Job/JobContent';

const App = () => (
  <Router>
    <Container>
      <div className="main-content">
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={MainContent} />
          <Route path="/projects" exact component={ProjectContent} />
          <Route path="/projects/:id" component={JobContent} />
        </Switch>
      </div>
    </Container>
  </Router>
);

export default App;
