import React from 'react'

export class BlockHeader extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}