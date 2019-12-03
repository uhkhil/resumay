import React from 'react'
import { humanifyDate } from '../../utils/Utils';

export class Certificate extends React.Component {
    render() {
        const cert = this.props.data;
        return (
            <div className='block column block-container'>
                <div className='block-title-container'>
                    <span className='block-title'>{cert.certificationName}</span>
                    <span className='text'><i className="fa fa-calendar"></i>{humanifyDate(cert.startDate)} - {humanifyDate(cert.endDate)}</span>
                </div>
                <div className='block-subtitle-container'>
                    <span className='block-subtitle' >{cert.instituteName}</span>
                    <span className='text'><i className="fa fa-map-marker"></i> {cert.location}</span>
                </div>
                {cert.description ?
                    <p className='text'>{cert.description}</p> : null
                }
            </div >
        )
    }
}