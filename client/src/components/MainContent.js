import React from 'react';
import './stylesheets/AboutContent.css'

const MainContent = props => {
    return (
        <div style={{ marginTop: '15rem' }}>
            <h1 className= 'dukemeet'>duke.meet</h1>
            <p className = 'description'>Helping connect students and start-ups to top talent and ideas!</p>
        </div>
    );
};

export default MainContent;