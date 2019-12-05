import React from 'react'

export class Project extends React.Component {
    render() {
        const project = this.props.data;
        return (
            <div className='form-block-block'>
                <a className='subtle-anchor' href={project.link} target='_blank' rel='noopener noreferrer'>{project.projectName}</a>
                <br />
                {
                    project.skills ?
                        <div className='tag-list'>{project.skills.map((skill, id) => <span key={id} className='tag'>{skill}</span>)}</div>
                        : null
                }
                <p className='text'>{project.description}</p>
            </div>
        )
    }
}