import React from 'react';
import { cloner, now } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class EventsEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
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
        const newObj = {
            eventName: '',
            instituteName: '',
            date: '',
            description: ''
        }
        arr.push(newObj);
        const idx = arr.length - 1;
        this.setState({ events: arr }, () => { this['ref' + idx].scrollIntoView({ behavior: 'smooth' }) })
    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    submit = async ev => {
        ev.preventDefault();
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
        return (
            <div key={idx} className='form-block' ref={el => this['ref' + idx] = el}>
                <span className='button-remove' onClick={this.removeEvent.bind(null, idx)}><i className='fa fa-times'></i></span>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Event / Award*</label>
                        <input type='text' maxLength='30' required value={event.eventName} onChange={this.handleChange} data-id={idx} name='eventName' />
                    </div>
                    <div className='form-control'>
                        <label>Institute*</label>
                        <input type='text' maxLength='30' required value={event.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Date*</label>
                        <input type='date' max={now()} required value={event.date} onChange={this.handleChange} data-id={idx} name='date' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Description</label>
                        <textarea maxLength='500' value={event.description} onChange={this.handleChange} data-id={idx} name='description' />
                    </div>
                </div>
            </div>
        )
    }

    render = () => {
        const { events, loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Events / Awards' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <button type='button' className='button button-primary button-add' onClick={this.addEvent}>Add Event</button>
                    {events.map((ins, idx) => this.renderEventForm(ins, idx))}
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}