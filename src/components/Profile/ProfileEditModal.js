import React from 'react';
import { Modal } from '../Modal/Modal';

export class ProfileEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileData: props.data
        };
    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    submit = async ev => {
        ev.preventDefault();
        const { profileData } = this.state;
        this.setState({ loading: true });
        const updated = await this.props.update({ ...profileData });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProfileData = { ...this.state.profileData };
        updatedProfileData[name] = value;
        this.setState({ profileData: updatedProfileData })
    }

    render = () => {
        const { profileData, loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Profile' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form onSubmit={this.submit} className='form'>
                    <div className='form-group'>
                        <div className='form-control'>
                            <label htmlFor='image'>Image</label>
                            <input type='text' maxLength='30' name='image' required value={profileData.image} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='form-control'>
                            <label htmlFor='firstName'>First Name*</label>
                            <input type='text' maxLength='30' name='firstName' required value={profileData.firstName} onChange={this.handleChange} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='lastName'>Last Name*</label>
                            <input type='text' maxLength='30' name='lastName' required value={profileData.lastName} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='form-group'>

                        <div className='form-control'>

                            <label htmlFor='email'>Email*</label>
                            <input type='email' name='email' required value={profileData.email} onChange={this.handleChange} />
                        </div>


                        <div className='form-control'>

                            <label htmlFor='phone'>Phone*</label>
                            <input type='number' name='phone' required value={profileData.phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='form-control'>

                            <label htmlFor='city'>City*</label>
                            <input type='text' maxLength='30' name='city' required value={profileData.city} onChange={this.handleChange} />
                        </div>
                        <div className='form-control'>

                            <label htmlFor='country'>Country*</label>
                            <input type='text' maxLength='30' name='country' required value={profileData.country} onChange={this.handleChange} />
                        </div>
                    </div>
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}