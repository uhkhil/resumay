import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'
import { Modal } from '../Modal/Modal'

export class Bio extends React.Component {
    state = {
        isOpen: false,
        bio: this.props.data
    }

    toggleEditModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    submit = async (event) => {
        event.preventDefault();
        const data = { bio: this.state.bio }
        const updated = await this.props.update(data)
        if (updated) {
            this.toggleEditModal();
        } else {
            console.error('Something went wrong');
        }
    }

    textChange = (event) => {
        const value = event.target.value;
        this.setState({ bio: value })
    }

    renderModal = () => {
        return <Modal title='Profile Overview' isOpen={this.state.isOpen} close={this.toggleEditModal} submit={this.submit}>
            <label htmlFor="exampleMessage">Bio</label>
            <textarea
                minLength={10}
                maxLength={500}
                className="u-full-width"
                placeholder="I am a full-stack developer with 15 years of experience..."
                id="exampleMessage"
                value={this.state.bio}
                onChange={this.textChange}
            ></textarea>
        </Modal>
    }

    render() {
        const bio = this.props.data
        return (
            <div className="block">
                <BlockHeader title='Profile Overview' edit={this.toggleEditModal} />
                <p>{bio}</p>
                {this.renderModal()}
            </div>
        )
    }
}