import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'

const Event = (props) => {
    const event = props.data;
    return (
        <div className='block'>
            <h5>{event.award}</h5>
            <p>{event.description}</p>
        </div>
    )
}

export class Events extends React.Component {
    render() {
        const events = this.props.data;
        return (
            <div className='block'>
                <BlockHeader title='Events' />
                {events.map(event => <Event data={event} />)}
            </div>
        )
    }
}