import React from 'react'

export class BlockHeader extends React.Component {

    edit = () => {
        this.props.edit()
    }

    render() {
        return (
            <div className='row'>
                <h4 className='five columns'>{this.props.title}</h4>
                {
                    this.props.mode === 'EDIT' || true ?
                        <button className='three columns u-pull-right' onClick={this.edit}>Edit</button> : null
                }
            </div>
        )
    }
}