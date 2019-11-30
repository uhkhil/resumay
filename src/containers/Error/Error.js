import React from 'react';
import './Error.css';

export class Error extends React.Component {

    home = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='container'>
                <h3 className='landing-title'>Oops</h3>
                <h4 className='landing-subtitle'>Something went wrong. Maybe, you used a wrong url?</h4>
                <br />
                <button onClick={this.home}>Home</button>
            </div>
        )
    }
}