import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { EventsEditModal } from './EventsEditModal';
import { Event } from './Event';

export class Events extends React.Component {

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
                <BlockHeader mode={this.props.mode} title="Events / Awards" icon='trophy' edit={this.toggleModal} />
                {events.map((institute, idx) => <Event key={idx} data={institute} />)}
                <EventsEditModal data={events} isOpen={isOpen} toggleModal={this.toggleModal} update={this.props.update} />
            </div>
        )
    }
}