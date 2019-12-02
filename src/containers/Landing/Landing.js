import React from 'react';
import { Auth } from '../../services/Auth';
import './Landing.css';

export class Landing extends React.Component {

    state = {
        loading: false
    }

    login = async () => {
        this.setState({ loading: true })
        const loggedIn = await Auth.login();
        this.setState({ loading: false })
        if (loggedIn) {
            this.props.history.push('/creator');
        }

    }

    render() {
        return (
            <div className='container'>
                <h3 className='landing-title'>Resumay</h3>
                <h4 className='landing-subtitle'>Go paperless. Share you profile with the world.</h4>
                <br />
                <button onClick={this.login} disabled={this.state.loading}>
                    {!this.state.loading ?
                        'Get started!' : 'Loading...'
                    }
                </button>
            </div>
        )
    }
}