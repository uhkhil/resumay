import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { Institute } from '../Institute/Institute';
import { Modal } from '../Modal/Modal';
import { cloner } from '../../utils/Utils';

export class Education extends React.Component {

    state = {
        institutes: cloner(this.props.data),
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    removeInstitute = idx => {
        const arr = cloner(this.state.institutes);
        arr.splice(idx, 1)
        this.setState({ institutes: arr })
    }

    addInstitue = () => {
        const arr = cloner(this.state.institutes)
        const newObj = {}
        arr.push(newObj);
        this.setState({ institutes: arr })
    }

    submit = async () => {
        const data = this.state.institutes;
        this.setState({ loading: true });
        const updated = await this.props.update({ education: data });
        this.setState({ loading: false });
        if (updated) {
            this.toggleModal();
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
        return <React.Fragment key={idx}>
            <button type='button' onClick={this.removeInstitute.bind(null, idx)}>Remove</button>
            <label>Degree</label>
            <input type='text' value={institute.degreeName} onChange={this.handleChange} data-id={idx} name='degreeName' />
            <label>Institute</label>
            <input type='text' required value={institute.instituteName} onChange={this.handleChange} data-id={idx} name='instituteName' />
            <label>Start date</label>
            <input type='date' required value={institute.startDate} onChange={this.handleChange} data-id={idx} name='startDate' />
            <label>End date</label>
            <input type='date' required value={institute.endDate} onChange={this.handleChange} data-id={idx} name='endDate' />
            <label>Location</label>
            <input type='text' required value={institute.location} onChange={this.handleChange} data-id={idx} name='location' />
            <label>Description</label>
            <textarea value={institute.description} onChange={this.handleChange} data-id={idx} name='description' />
        </React.Fragment>
    }

    renderModal = () => {
        const { institutes, isOpen } = this.state;
        return (
            <Modal title='Education' isOpen={isOpen} submit={this.submit} close={this.toggleModal}>
                <form>
                    <button type='button' onClick={this.addInstitue}>Add Institute</button>
                    {institutes.map((ins, idx) => this.renderInstituteForm(ins, idx))}
                </form>
            </Modal>
        )
    }

    render() {
        const institutes = this.props.data;
        return (
            <div className="block">
                <BlockHeader mode={this.props.mode} title="Education" edit={this.toggleModal} />
                {institutes.map((institute, idx) => <Institute key={idx} data={institute} />)}
                {this.renderModal()}
            </div>
        )
    }
}