import React from 'react'

export class Institute extends React.Component {
    render() {
        const school = this.props.data;
        return (
            <div className='block'>
                <h4>{school.degreeName}</h4>
                <h5>{school.instituteName}</h5>
            </div>
        )
    }
}