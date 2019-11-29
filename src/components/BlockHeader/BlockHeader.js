import React from 'react'

export class BlockHeader extends React.Component {

    edit = () => {
        this.props.edit()
    }

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                {
                    this.props.mode === 'EDIT' || true ?
                        <span onClick={this.edit}>Edit</span> : null
                }
            </div>
        )
    }
}