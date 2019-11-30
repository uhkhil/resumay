import React from 'react'
import './Project.css';

export class Project extends React.Component {
    render() {
        const project = this.props.data
        // TODO: Make dynamic
        project.skills = ['React', 'Angular', 'AWS']
        return (
            <div className='project-container'>
                <a className='subtle-anchor' href={project.projectName} target='_blank' rel='noopener noreferrer'>{project.projectName}</a>
                <br />
                {
                    project.skills ?
                        <h5 className='skills-list'>{project.skills.join(', ')}</h5>
                        : null
                }
                <p className='text'>{project.description}</p>
            </div>
        )
    }
}