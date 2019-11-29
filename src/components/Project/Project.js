import React from 'react'

export class Project extends React.Component {
    render() {
        const project = this.props.data
        return (
            <div className='block'>
                <h5>{project.projectName}</h5>
                {
                    project.skills ?
                        <ul>
                            {project.skills.map((skill, idx) => <li key={idx}>{skill.display}</li>)}
                        </ul> : null
                }
                <p>{project.description}</p>
            </div>
        )
    }
}