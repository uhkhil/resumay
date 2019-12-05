import React from 'react';
import { cloner, now } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class CertificationEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            certs: cloner(props.data)
        };
    }

    removeCert = idx => {
        const arr = cloner(this.state.certs);
        arr.splice(idx, 1)
        this.setState({ certs: arr })
    }

    addCert = () => {
        const arr = cloner(this.state.certs)
        const newObj = {
            certificationName: '',
            instituteName: '',
            startDate: '',
            endDate: '',
            location: '',
            description: ''
        }
        arr.push(newObj);
        const idx = arr.length - 1;
        this.setState({ certs: arr }, () => { this['ref' + idx].scrollIntoView({ behavior: 'smooth' }) })

    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    submit = async ev => {
        ev.preventDefault();
        const data = this.state.certs;
        this.setState({ loading: true });
        const updated = await this.props.update({ certifications: data });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const { certs } = this.state;
        certs[id][target.name] = target.value;
        this.setState({ certs })
    }

    renderCertForm = (cert, idx) => {
        return (
            <div key={idx} className='form-block' ref={el => this['ref' + idx] = el}>
                <span className='button-remove' onClick={this.removeCert.bind(null, idx)}><i className='fa fa-times'></i></span>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Certification*</label>
                        <input type='text' maxLength='30' required value={cert.certificationName} onChange={this.handleChange} data-id={idx} name='certificationName' />
                    </div>
                    <div className='form-control'>
                        <label>Institute*</label>
                        <input type='text' maxLength='30' required value={cert.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Start date*</label>
                        <input type='date' required value={cert.startDate} onChange={this.handleChange} data-id={idx} name='startDate' />
                    </div>
                    <div className='form-control'>
                        <label>End date*</label>
                        <input type='date' max={now()} required value={cert.endDate} onChange={this.handleChange} data-id={idx} name='endDate' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Location*</label>
                        <input type='text' maxLength='30' required value={cert.location} onChange={this.handleChange} data-id={idx} name='location' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Description</label>
                        <textarea maxLength='500' value={cert.description} onChange={this.handleChange} data-id={idx} name='description' />
                    </div>
                </div>
            </div>
        )
    }

    render = () => {
        const { certs, loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Certification' isOpen={isOpen} submit={this.trySubmit} submittingg={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <button type='button' className='button button-primary button-add' onClick={this.addCert}>Add Certification</button>
                    {certs.map((ins, idx) => this.renderCertForm(ins, idx))}
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}