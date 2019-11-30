import React from 'react';
import { Auth } from '../../services/Auth';
import './Landing.css';

export class Landing extends React.Component {

    login = async () => {
        const loggedIn = await Auth.login();
        if (loggedIn) {
            this.props.history.push('/creator');
        }
    }

    render() {
        return (
            <div className='container'>
                <h3 className='landing-title'>Resumay</h3>
                <h4 className='landing-subtitle'>Go paper less. Share you profile with the world.</h4>
                <br />
                <button onClick={this.login}>Get started!</button>
            </div>
        )
    }
}