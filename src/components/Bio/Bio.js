import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'

export class Bio extends React.Component {
    render() {
        const bio = this.props.data
        return (
            <div className="block">
                <BlockHeader title='Profile Overview' />
                <p>{bio}</p>
            </div>
        )
    }
}