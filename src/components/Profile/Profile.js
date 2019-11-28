import React from 'react'
import './Profile.css'

export class Profile extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className='block profile-container'>
                <img src={data.image} className='image' alt="profile" />
                <h4>{data.firstName} {data.lastName}</h4>
                <hr />
                <h4>{data.email}</h4>
                <h4>{data.phone}</h4>
                <h4>{data.city}, {data.country}</h4>
            </div>
        )
    }
}