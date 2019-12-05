import React from 'react';

export class NoData extends React.Component {
    render() {
        const { condition } = this.props;
        return (
            !condition ?
                (<div className='block-no-data'>
                    <h4><i className='fa fa-search' />Nothing here yet</h4>
                </div>)
                : null
        )
    }
}