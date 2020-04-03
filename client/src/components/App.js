import React from 'react';
import { Container } from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import MainContent from './MainContent';
import ProjectContent from './ProjectContent';
import './stylesheets/App.css';

class App extends React.Component {
    state = { activeItem: 'home' };

    updateActiveItem = item => this.setState({ activeItem: item });

    renderMainPage() {
        if (this.state.activeItem === 'home') {
            return <MainContent />
        } else if (this.state.activeItem === 'projects') {
            return <ProjectContent />
        }
    }

    render() {
        return (
            <Container>
                <div className='main-content'>
                    <NavigationBar activeItem={this.state.activeItem} updateItem={this.updateActiveItem}/>
                    {this.renderMainPage()}
                </div>
            </Container>
        );
    }
}

export default App;
