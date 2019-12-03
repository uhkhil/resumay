import React from 'react';
import './BlockHeader.css';
import { MODES } from '../constants/Mode';

export class BlockHeader extends React.Component {

    edit = () => {
        this.props.edit()
    }

    render() {
        return (
            <React.Fragment>
                <div className='row aic jcsb'>
                    <h4 className='block-header-title'>
                        <i className={'block-header-icon primary-color fa fa-' + this.props.icon}></i>
                        {this.props.title}
                    </h4>
                    {
                        this.props.mode === MODES.EDIT ?
                            <i className="fa fa-pencil fa-lg u-pull-right" onClick={this.edit}></i> : null
                    }
                </div>
                <hr className='m0 ' />
            </React.Fragment>
        )
    }
}