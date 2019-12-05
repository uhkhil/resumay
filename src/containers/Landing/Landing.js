import React from 'react';
import { Auth } from '../../services/Auth';
import './Landing.css';

export class Landing extends React.Component {

    state = {
        loading: false
    }

    start = async () => {
        this.setState({ loading: true })
        const alreadyLoggedIn = Auth.checkSession();
        let loggedIn;
        if (!alreadyLoggedIn) {
            loggedIn = await Auth.login();
        }
        await Auth.setSession();
        this.setState({ loading: false })
        if (alreadyLoggedIn || loggedIn) {
            this.props.history.push('/creator');
        }
    }

    render() {
        return (
            <div className='container'>
                <h3 className='landing-title'>Resumay</h3>
                <h4 className='landing-subtitle'>Go paperless. Share you profile with the world.</h4>
                <br />
                <button onClick={this.start} disabled={this.state.loading}>
                    {!this.state.loading ?
                        'Get started!' : 'Loading...'
                    }
                </button>
            </div>
        )
    }
}