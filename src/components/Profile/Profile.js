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
                <input type='text' name='image' required defaultValue={this.state.profileData.image} />
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
                <img src={data.image} className='image' alt="profile" />
                <button type='button' onClick={this.toggleEditModal}>Edit</button>
                <h4>{data.firstName} {data.lastName}</h4>
                <hr />
                <h4>{data.email}</h4>
                <h4>{data.phone}</h4>
                <h4>{data.city}, {data.country}</h4>
                {this.renderModal()}
            </div>
        )
    }
}