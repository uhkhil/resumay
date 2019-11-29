import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'
import { Modal } from '../Modal/Modal'
import { JSONifyFormData } from '../../utils/Utils';

export class Bio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            bio: this.props.data
        }
    }

    toggleEditModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    submit = async (event) => {
        event.preventDefault();
        const data = JSONifyFormData(new FormData(event.target))
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
            <form onSubmit={this.submit}>
                <label htmlFor="bio">Bio</label>
                <textarea
                    minLength={10}
                    maxLength={500}
                    className="u-full-width"
                    placeholder="I am a full-stack developer with 15 years of experience..."
                    name='bio'
                    defaultValue={this.props.data}
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
        </Modal>
    }

    render() {
        const bio = this.props.data
        return (
            <div className="block">
                <BlockHeader title='Profile Overview' mode={this.props.mode} edit={this.toggleEditModal} />
                <p>{this.props.data}</p>
                <p>{this.state.bio}</p>
                {this.renderModal()}
            </div>
        )
    }
}