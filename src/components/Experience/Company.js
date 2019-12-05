import React from 'react'
import { humanifyDate } from '../../utils/Utils';
import { Project } from './Project';

export class Company extends React.Component {

    renderProjects = (projects) => {
        if (projects && projects.length) {
            return projects.map(project => <Project data={project} />)
        } else return null;
    }

    render() {
        const company = this.props.data;
        return (
            <div className='block column block-container'>
                <div className='block-title-container'>
                    <span className='block-title'>{company.title}</span>
                    <span className='text'><i className="fa fa-calendar"></i>{humanifyDate(company.startDate)} - {humanifyDate(company.endDate)}</span>
                </div>
                <div className='block-subtitle-container'>
                    <span className='block-subtitle' >{company.companyName}</span>
                    <span className='text'><i className="fa fa-map-marker"></i> {company.location}</span>
                </div>
                {company.description ?
                    <p className='text'>{company.description}</p> : null
                }
                {this.renderProjects(company.projects)}
            </div >
        )
    }
}