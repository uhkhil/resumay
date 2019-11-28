import React from 'react'

export class Project extends React.Component {
    render() {
        const project = this.props.data
        return (
            <div className='block'>
                <h5>{project.projectName}</h5>
                <ul>
                    {project.skills.map(skill => <li>{skill.display}</li>)}
                </ul>
                <p>{project.description}</p>
            </div>
        )
    }
}