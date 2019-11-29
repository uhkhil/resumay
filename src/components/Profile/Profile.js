import React from 'react'
import './Profile.css'
import { Modal } from '../Modal/Modal'
import { JSONifyFormData } from '../../utils/Utils'

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
                <input type='text' name='email' required defaultValue={this.props.data.email} />
                <label htmlFor='phone'>Phone</label>
                <input type='text' name='phone' required defaultValue={this.props.data.phone} />
                <label htmlFor='city'>City</label>
                <input type='text' name='city' required defaultValue={this.props.data.city} />
                <label htmlFor='country'>Country</label>
                <input type='text' name='country' required defaultValue={this.props.data.country} />
                <button type='submit'>Submit</button>
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
                <img src={data.image} className='image tac' alt="profile" />
                <h4 className='tac'>{data.firstName} {data.lastName}</h4>
                <hr />
                <button type='button u-pull-right' onClick={this.toggleEditModal}>Edit</button>
                <h5 className='p0 m0'>{data.email}</h5>
                <h5 className='p0 m0'>{data.phone}</h5>
                <h5 className='p0 m0'>{data.city}, {data.country}</h5>
                {this.renderModal()}
            </div>
        )
    }
}