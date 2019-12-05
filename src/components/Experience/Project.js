import React from 'react'

export class Project extends React.Component {
    render() {
        const project = this.props.data;
        return (
            <div className='form-block-block'>
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