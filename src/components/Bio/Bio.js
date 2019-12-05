import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { BioEditModal } from './BioEditModal';
import { NoData } from '../NoData/NoData';

export class Bio extends React.Component {

    state = {
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const events = this.props.data;
        const { isOpen } = this.state;
        return (
            <div className="block">
                <BlockHeader mode={this.props.mode} title="Profile overview" icon='trophy' edit={this.toggleModal} />
                {
                    this.props.data ?
                        <div className='block-content'>
                            <p className='text'>{this.props.data}</p>
                        </div> : null
                }
                <NoData condition={this.props.data} />
                {
                    isOpen ?
                        <BioEditModal data={events} toggleModal={this.toggleModal} update={this.props.update} />
                        : null
                }
            </div>
        )
    }
}