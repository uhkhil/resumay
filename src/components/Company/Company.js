import React from 'react'
import { Project } from '../Project/Project'

export class Company extends React.Component {
    render() {
        const company = this.props.data
        return (
            <div className='block'>
                <h4>{company.title}</h4>
                <h5>{company.companyName}</h5>
                <p>{company.description}</p>
                {company.projects.length ? (
                    <div>
                        <h5>Projects</h5>
                        {company.projects.map((project, idx) => <Project key={idx} data={project} />)}
                    </div>
                ) : null}
            </div>
        )
    }
}