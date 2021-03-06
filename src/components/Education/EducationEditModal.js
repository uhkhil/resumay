import React from 'react';
import { cloner, now } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class EducationEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            institutes: cloner(props.data)
        };
    }

    removeInstitute = idx => {
        const arr = cloner(this.state.institutes);
        arr.splice(idx, 1)
        this.setState({ institutes: arr })
    }

    addInstitue = () => {
        const arr = cloner(this.state.institutes)
        const newObj = {
            degreeName: '',
            instituteName: '',
            startDate: '',
            endDate: '',
            location: '',
            description: ''
        }
        arr.push(newObj);
        const idx = arr.length - 1;
        this.setState({ institutes: arr }, () => { this['ref' + idx].scrollIntoView({ behavior: 'smooth' }) })
    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    submit = async ev => {
        ev.preventDefault();
        const data = this.state.institutes;
        this.setState({ loading: true });
        const updated = await this.props.update({ education: data });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const { institutes } = this.state;
        institutes[id][target.name] = target.value;
        this.setState({ institutes })
    }

    renderInstituteForm = (institute, idx) => {
        return <div key={idx} className='form-block' ref={el => this['ref' + idx] = el}>
            <span type='button' className='button-remove' onClick={this.removeInstitute.bind(null, idx)}><i className='fa fa-times'></i></span>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Degree*</label>
                    <input type='text' maxLength='30' required value={institute.degreeName} onChange={this.handleChange} data-id={idx} name='degreeName' />
                </div>
                <div className='form-control'>
                    <label>Institute*</label>
                    <input type='text' maxLength='30' required value={institute.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Start date*</label>
                    <input type='date' max={institute.endDate} required value={institute.startDate} onChange={this.handleChange} data-id={idx} name='startDate' />
                </div>
                <div className='form-control'>
                    <label>End date*</label>
                    <input type='date' min={institute.startDate} max={now()} required value={institute.endDate} onChange={this.handleChange} data-id={idx} name='endDate' />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Location*</label>
                    <input type='text' maxLength='30' required value={institute.location} onChange={this.handleChange} data-id={idx} name='location' />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Description</label>
                    <textarea maxLength='500' value={institute.description} onChange={this.handleChange} data-id={idx} name='description' />
                </div>
            </div>
        </div>
    }

    render = () => {
        const { institutes, loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Education' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <button type='button' className='button-add button-primary' onClick={this.addInstitue}>Add Institute</button>
                    {institutes.map((ins, idx) => this.renderInstituteForm(ins, idx))}
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}