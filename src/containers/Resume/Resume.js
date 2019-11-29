import React from 'react';
import { Profile } from '../../components/Profile/Profile';
import { Tags } from '../../components/Tags/Tags';
import { Bio } from '../../components/Bio/Bio';
import { Experience } from '../../components/Experience/Experience';

import { API } from '../../services/API';
import { Auth } from '../../services/Auth';

export class Resume extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Figure out way to call this when page called everytime
        if (props.mode === 'EDIT') {
            const session = Auth.checkSession();
            if (!session) {
                console.log('Redirect to login.')
                props.history.push('/');
            }
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
        const userId = 'b';
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
    }

    update = async data => {
        const userId = 'b';
        const result = await API.updateResume(userId, data);
        if (result.data && result.data.status) {
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
        this.props.history.push('/view');
    }

    renderHeader = () => {
        return (
            <header className='row'>
                <h4 className='one column'>Resumay</h4>
                <div className='one row u-pull-right'>
                    <button onClick={this.view}>View</button>
                    <button onClick={this.download}>Download</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </header>
        )
    }

    render() {
        return (
            <div className="">
                {
                    this.props.mode === 'EDIT' ? this.renderHeader() : null
                }
                <div className="row">
                    <div className="four columns">
                        <Profile mode={this.props.mode} data={this.state.profileData} update={this.update} />
                        <Tags data={this.state.tags} update={this.update} />
                    </div>
                    <div className="eight columns">
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