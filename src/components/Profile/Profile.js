import React from 'react';
import { ProfileEditModal } from './ProfileEditModal';
import { MODES } from '../constants/Mode';
import './Profile.css';

export class Profile extends React.Component {

    state = {
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { data } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="block">
                {
                    this.props.mode === MODES.EDIT ?
                        <i className='fa fa-pencil fr fs20' onClick={this.toggleModal}></i>
                        : null
                }
                <div className='block-content column aic jcsa'>
                    <img src={data.image} className='profile-image' alt="profile" />
                    <h4 className='profile-name'>{data.firstName} {data.lastName} </h4>
                </div>
                <hr />
                <div className='block-content'>
                    <a href={'mailto:' + data.email} className='p0 m0 text subtle-anchor'><i className="fa fa-envelope"></i> {data.email}</a><br />
                    {
                        data.phone ?
                            <React.Fragment>
                                <a href={'tel:' + data.phone} className='p0 m0 text subtle-anchor'><i className="fa fa-phone"></i> {data.phone}</a> <br />
                            </React.Fragment>
                            : null
                    }
                    {
                        data.city || data.country ?
                            <React.Fragment>
                                <span className='p0 m0 text'><i className="fa fa-map-marker"></i> {data.city}, {data.country}</span><br />
                            </React.Fragment> : null
                    }
                </div>
                {
                    isOpen ?
                        <ProfileEditModal data={data} toggleModal={this.toggleModal} update={this.props.update} />
                        : null
                }
            </div>
        )
    }
}