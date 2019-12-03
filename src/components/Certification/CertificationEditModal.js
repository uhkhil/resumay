import React from 'react';
import { cloner } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class CertificationEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            certs: cloner(props.data)
        };
    }

    removeCert = idx => {
        const arr = cloner(this.state.certs);
        arr.splice(idx, 1)
        this.setState({ certs: arr })
    }

    addInstitue = () => {
        const arr = cloner(this.state.certs)
        const newObj = {}
        arr.push(newObj);
        this.setState({ certs: arr })
    }

    submit = async () => {
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
        return <React.Fragment key={idx}>
            <button type='button' onClick={this.removeCert.bind(null, idx)}>Remove</button>
            <label>Certification</label>
            <input type='text' value={cert.certificationName} onChange={this.handleChange} data-id={idx} name='certificationName' />
            <label>Institute</label>
            <input type='text' required value={cert.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
            <label>Start date</label>
            <input type='date' required value={cert.startDate} onChange={this.handleChange} data-id={idx} name='startDate' />
            <label>End date</label>
            <input type='date' required value={cert.endDate} onChange={this.handleChange} data-id={idx} name='endDate' />
            <label>Location</label>
            <input type='text' required value={cert.location} onChange={this.handleChange} data-id={idx} name='location' />
            <label>Description</label>
            <textarea value={cert.description} onChange={this.handleChange} data-id={idx} name='description' />
        </React.Fragment>
    }

    render = () => {
        const { certs } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Certification' isOpen={isOpen} submit={this.submit} close={toggleModal}>
                <form>
                    <button type='button' onClick={this.addInstitue}>Add Certification</button>
                    {certs.map((ins, idx) => this.renderCertForm(ins, idx))}
                </form>
            </Modal>
        )
    }
}