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
                <h1>Resumay</h1>
                <h3>Go paper less. Share you profile with the world.</h3>
                <br />
                <button onClick={this.login}>Get started!</button>
            </div>
        )
    }
}