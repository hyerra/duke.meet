import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavigationBar from './NavigationBar';
import MainContent from './Home/MainContent';
import ProjectContent from './Project/ProjectContent';
import JobContent from './Job/JobContent';
import AboutContent from './About/AboutContent';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import JobEdit from './Profile/JobEdit';
import ProjectEdit from './Profile/ProjectEdit';

const App = () => (
  <Router>
    <Container>
      <div className="main-content">
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={MainContent} />
          <Route path="/projects" exact component={ProjectContent} />
          <Route path="/projects/:id" component={JobContent} />
          <Route path="/about" component={AboutContent} />
          <Route path="/login" component={Login} />
          <Route path="/sign_up" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/jobedit" component={JobEdit} />
        </Switch>
      </div>
    </Container>
  </Router>
);

export default App;
