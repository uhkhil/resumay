import React from 'react'
import { humanifyDate } from '../../utils/Utils';

export class Event extends React.Component {
    render() {
        const event = this.props.data;
        return (
            <div className='block column block-container'>
                <div className='block-title-container'>
                    <span className='block-title'>{event.eventName}</span>
                    <span className='text'><i className="fa fa-calendar"></i>{humanifyDate(event.date)}</span>
                </div>
                <div className='block-subtitle-container'>
                    <span className='block-subtitle' >{event.instituteName}</span>
                </div>
                {event.description ?
                    <p className='text'>{event.description}</p> : null
                }
            </div >
        )
    }
}