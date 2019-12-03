import React from 'react'
import { Project } from '../Project/Project'
import './Company.css';

export class Company extends React.Component {
    render() {
        const company = this.props.data
        return (
            <div className='block column company-container'>
                <div className='row aic jcsb mb10'>
                    <span className='company-title'>{company.title}</span>
                    <span className='text'><i className="fa fa-calendar"></i>Feb 2019 - Jun 2019</span>
                </div>
                <div className='row aic jcsb mb10'>
                    <a className='company-name subtle-anchor' href={company.link} rel='noopener noreferrer' target='_blank'>{company.companyName}</a>
                    <span className='text'><i className="fa fa-map-marker"></i> {company.location}</span>
                </div>
                <p className='text'>{company.description}</p>
                {
                    company.projects.length ? (
                        <div>
                            <h4 className='header-text'>Projects</h4>
                            {company.projects.map((project, idx) => <Project key={idx} data={project} />)}
                        </div>
                    ) : null
                }
            </div >
        )
    }
}