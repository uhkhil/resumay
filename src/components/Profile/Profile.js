import React from 'react'
import './Profile.css'
import { Modal } from '../Modal/Modal'
import { JSONifyFormData } from '../../utils/Utils'
import { MODES } from '../constants/Mode'

export class Profile extends React.Component {

    state = {
        isOpen: false,
        profileData: this.props.data
    }

    submit = async (event) => {
        event.preventDefault();
        const profileData = JSONifyFormData(new FormData(event.target))
        const updated = await this.props.update({ ...profileData })
        if (updated) {
            this.toggleEditModal();
        } else {
            console.error('Something went wrong');
        }
    }

    renderModal = () => {
        return <Modal title='Profile Overview' isOpen={this.state.isOpen} close={this.toggleEditModal} submit={this.submit}>
            <form onSubmit={this.submit}>
                <label htmlFor='image'>Image</label>
                <input type='text' name='image' required defaultValue={this.props.data.image} />
                <label htmlFor='firstName'>First Name</label>
                <input type='text' name='firstName' required defaultValue={this.props.data.firstName} />
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' name='lastName' required defaultValue={this.props.data.lastName} />
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' required defaultValue={this.props.data.email} />
                <label htmlFor='phone'>Phone</label>
                <input type='number' name='phone' required defaultValue={this.props.data.phone} />
                <label htmlFor='city'>City</label>
                <input type='text' name='city' required defaultValue={this.props.data.city} />
                <label htmlFor='country'>Country</label>
                <input type='text' name='country' required defaultValue={this.props.data.country} />
                <br />
                <button type='submit' className='button-primary'>Submit</button>
            </form>
        </Modal>
    }

    toggleEditModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const data = this.props.data
        return (
            <div className='block profile-container'>
                {
                    this.props.mode === MODES.EDIT ?
                        <i className='fa fa-pencil fr fs20' onClick={this.toggleEditModal}></i>
                        : null
                }
                <div className='block-content column aic jcsa'>
                    <img src={data.image} className='image tac' alt="profile" />
                    <h4 className='tac profile-name'>{data.firstName} {data.lastName} </h4>
                </div>
                <hr />
                <div className='block-content'>
                    <a href={'mailto:' + data.email} className='p0 m0 text subtle-anchor'><i className="fa fa-envelope"></i> {data.email}</a><br />
                    <a href={'tel:' + data.phone} className='p0 m0 text subtle-anchor'><i className="fa fa-phone"></i> {data.phone}</a><br />
                    <span className='p0 m0 text'><i className="fa fa-map-marker"></i> {data.city}, {data.country}</span><br />
                </div>
                {this.renderModal()}
            </div>
        )
    }
}