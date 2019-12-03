import React from 'react'
import { humanifyDate } from '../../utils/Utils';

export class Institute extends React.Component {
    render() {
        const school = this.props.data;
        return (
            <div className='block column block-container'>
                <div className='block-title-container'>
                    <span className='block-title'>{school.degreeName}</span>
                    <span className='text'><i className="fa fa-calendar"></i>{humanifyDate(school.startDate)} - {humanifyDate(school.endDate)}</span>
                </div>
                <div className='block-subtitle-container'>
                    <span className='block-subtitle' >{school.instituteName}</span>
                    <span className='text'><i className="fa fa-map-marker"></i> {school.location}</span>
                </div>
                {school.description ?
                    <p className='text'>{school.description}</p> : null
                }
            </div >
        )
    }
}