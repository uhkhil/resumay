import React from 'react';
import { Profile } from '../../components/Profile/Profile';
import { Tags } from '../../components/Tags/Tags';
import { Bio } from '../../components/Bio/Bio';
import { Experience } from '../../components/Experience/Experience';
import './Resume.css';

import { API } from '../../services/API';
import { Auth } from '../../services/Auth';

export class Resume extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Figure out way to call this when page called everytime.
        // TODO: Figure out issue when no session on refresh.
        if (props.mode === 'EDIT') {
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
        this.state = {
            profileData: {},
            tags: [],
            bio: '',
            experiences: [],
            education: [],
            certifications: [],
            events: []
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
        } catch (err) {
            console.log('TCL: Resume -> fetchResume -> err', err);
            this.props.history.push('/error');
        }
    }

    update = async data => {
        const userId = this.userId;
        const result = await API.updateResume(userId, data);
        if (result.data && result.data.status) {
            if (data.image) {
                this.setState({ profileData: data })
            }
            if (data.bio) {
                this.setState({ bio: data.bio })
            }
            if (data.experiences) {
                this.setState({ experiences: data.experiences })
            }
        } else {
            alert('Something went wrong. Could not update resume');
        }
        return true;
    }

    logout = async () => {
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

    renderHeader = () => {
        return (
            <header className='row aic jcsb'>
                <h4 className='header-title'>Resumay</h4>
                <div className=''>
                    <button className="button-primary header-button" onClick={this.view}>View</button>
                    <button className="button-primary header-button" onClick={this.download}>Download</button>
                    <button className="button-primary header-button" onClick={this.logout}>Logout</button>
                </div>
            </header>
        )
    }

    render() {
        return (
            <div className="resume-container">
                {
                    this.props.mode === 'EDIT' ? this.renderHeader() : null
                }
                <div className="row">
                    <div className="f3">
                        <Profile mode={this.props.mode} data={this.state.profileData} update={this.update} />
                        <Tags data={this.state.tags} update={this.update} />
                    </div>
                    <div className="f8">
                        <Bio mode={this.props.mode} data={this.state.bio} update={this.update} />
                        <Experience data={this.state.experiences} update={this.update} />
                        {/* <Education data={this.state.education} update={this.update} />
                        <Certification data={this.state.certifications} update={this.update} />
                        <Events data={this.state.events} update={this.update} /> */}
                    </div>
                </div>
            </div>
        )
    }
}