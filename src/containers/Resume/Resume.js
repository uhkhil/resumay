import React from 'react';
import { Profile } from '../../components/Profile/Profile';
import { Tags } from '../../components/Tags/Tags';
import { Bio } from '../../components/Bio/Bio';
import { Experience } from '../../components/Experience/Experience';
import { Education } from '../../components/Education/Education'
import './Resume.css';

import { API } from '../../services/API';
import { Auth } from '../../services/Auth';
import { MODES } from '../../components/constants/Mode';
import { Certification } from '../../components/Certification/Certification';
import { Events } from '../../components/Events/Events';
import { Modal } from '../../components/Modal/Modal';

export class Resume extends React.Component {

    state = {
        profileData: {},
        tags: [],
        bio: '',
        experiences: [],
        education: [],
        certifications: [],
        events: [],
        loading: true,
        isOpen: false,
    }

    constructor(props) {
        super(props);
        // TODO: Figure out way to call this when page called everytime.
        // TODO: Figure out issue when no session on first load.
        if (props.mode === MODES.EDIT) {
            const session = Auth.checkSession();
            if (!session) {
                console.log('Redirect to login.')
                props.history.push('/');
                return;
            }
            this.userId = Auth.user().uid;
        } else {
            this.userId = this.props.match.params.userId;
        }
        this.fetchResume();
    }

    fetchResume = async () => {
        const userId = this.userId;
        try {
            const result = await API.fetchResume(userId)
            if (result.data && result.status) {
                const data = result.data.resource[0];
                const { image, firstName, lastName, email, phone, city, country, tags, bio, experiences, education, certifications, events } = data
                this.setState({
                    profileData: {
                        image,
                        firstName,
                        lastName,
                        email,
                        phone,
                        city,
                        country
                    },
                    tags,
                    bio,
                    experiences,
                    education,
                    certifications,
                    events
                })
            }
            this.setState({ loading: false })
        } catch (err) {
            this.props.history.push('/error');
        }
    }

    update = async data => {
        try {
            const result = await API.updateResume(data);
            if (result.data && result.data.status) {
                if (data.image) {
                    this.setState({ profileData: data })
                }
                if (data.bio) {
                    this.setState({ bio: data.bio })
                }
                if (data.tags) {
                    this.setState({ tags: data.tags })
                }
                if (data.experiences) {
                    this.setState({ experiences: data.experiences })
                }
                if (data.education) {
                    this.setState({ education: data.education })
                }
                if (data.certifications) {
                    this.setState({ certifications: data.certifications })
                }
                if (data.events) {
                    this.setState({ events: data.events })
                }
            } else {
                alert('Something went wrong. Could not update resume');
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }

    }

    logout = async () => {
        // TODO: Add confirmation
        await Auth.logout();
        this.props.history.push('/');
    }

    download = () => {
        // TODO: Figure out package to convert html to pdf
    }

    view = () => {
        // TODO: Open in new tab
        this.props.history.push('/view/' + this.userId);
    }

    share = () => {
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    renderHeader = () => {
        return (
            <header className='row aic jcsb'>
                <h4 className='header-title'>Resumay</h4>
                <div className='header-button-group'>
                    <button className="button-primary header-button" onClick={this.view}>View</button>
                    <button className="button-primary header-button" onClick={this.share}>Share</button>
                    {/* <button className="button-primary header-button" onClick={this.download}>Download</button> */}
                    <button className="button-primary header-button" onClick={this.logout}>Logout</button>
                </div>
            </header>
        )
    }

    renderLoading = () => {
        return (
            <div className='loading-container'>
                <div className="loading"></div>
            </div>
        )
    }

    copy = () => {
        this.linkInput.select();
        document.execCommand("copy");
    }

    renderShareModal = () => {
        return (
            <Modal title='Share this link with others' close={this.toggleModal}>
                <div className='block-share'>
                    <input readOnly ref={ev => this.linkInput = ev} type='text' value={'https://uhkhil-resumay.web.app/view/' + this.userId} id='link' />
                    <button className='button button-primary' onClick={this.copy}>Copy</button>
                </div>
            </Modal>
        )
    }



    render() {
        const { isOpen, profileData, tags, bio, experiences, education, certifications, events } = this.state;
        const { mode } = this.props;
        return (
            <div className="resume-container">
                <a href="https://github.com/uhkhil/resumay">
                    <img width="149" height="149" style={{ position: 'absolute' }}
                        src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149"
                        className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" />
                </a>
                {
                    mode === MODES.EDIT ? this.renderHeader() : null
                }
                {
                    !this.state.loading ?
                        <div className="row" style={{ flexWrap: 'wrap' }}>
                            <div className="f3">
                                <Profile mode={mode} data={profileData} update={this.update} />
                                <Tags mode={mode} data={tags} update={this.update} />
                            </div>
                            <div className="f8">
                                <Bio mode={mode} data={bio} update={this.update} />
                                {
                                    !experiences.length && mode === MODES.VIEW ?
                                        null :
                                        <Experience mode={mode} data={experiences} update={this.update} />
                                }
                                {
                                    !education.length && mode === MODES.VIEW ?
                                        null :
                                        <Education mode={mode} data={education} update={this.update} />
                                }
                                {
                                    !certifications.length && mode === MODES.VIEW ?
                                        null :
                                        <Certification mode={mode} data={certifications} update={this.update} />
                                }
                                {
                                    !events.length && mode === MODES.VIEW ?
                                        null :
                                        <Events mode={mode} data={events} update={this.update} />
                                }
                            </div>
                        </div>
                        : this.renderLoading()
                }
                {
                    isOpen ? this.renderShareModal() : null
                }
            </div>
        )
    }
}