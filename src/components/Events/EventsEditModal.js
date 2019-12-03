import React from 'react';
import { cloner } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class EventsEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            events: cloner(props.data)
        };
    }

    removeEvent = idx => {
        const arr = cloner(this.state.events);
        arr.splice(idx, 1)
        this.setState({ events: arr })
    }

    addEvent = () => {
        const arr = cloner(this.state.events)
        const newObj = {}
        arr.push(newObj);
        this.setState({ events: arr })
    }

    submit = async () => {
        const data = this.state.events;
        this.setState({ loading: true });
        const updated = await this.props.update({ events: data });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const { events } = this.state;
        events[id][target.name] = target.value;
        this.setState({ events })
    }

    renderEventForm = (event, idx) => {
        return <React.Fragment key={idx}>
            <button type='button' onClick={this.removeEvent.bind(null, idx)}>Remove</button>
            <label>Event / Award</label>
            <input type='text' required value={event.eventName} onChange={this.handleChange} data-id={idx} name='eventName' />
            <label>Institute</label>
            <input type='text' value={event.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
            <label>Date</label>
            <input type='date' required value={event.date} onChange={this.handleChange} data-id={idx} name='date' />
            <label>Description</label>
            <textarea value={event.description} onChange={this.handleChange} data-id={idx} name='description' />
        </React.Fragment>
    }

    render = () => {
        const { events } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Events / Awards' isOpen={isOpen} submit={this.submit} close={toggleModal}>
                <form>
                    <button type='button' onClick={this.addEvent}>Add Event</button>
                    {events.map((ins, idx) => this.renderEventForm(ins, idx))}
                </form>
            </Modal>
        )
    }
}