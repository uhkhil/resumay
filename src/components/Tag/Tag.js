import React from 'react'
import './Tag.css'

export class Tag extends React.Component {
    render() {
        return (
            <span className='tag'>{this.props.value}</span>
        )
    }
}