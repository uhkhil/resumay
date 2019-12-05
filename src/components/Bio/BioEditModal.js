import React from 'react';
import { Modal } from '../Modal/Modal';

export class BioEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bio: props.data,
            loading: false
        };
    }

    submit = async ev => {
        ev.preventDefault();
        const { bio } = this.state;
        this.setState({ loading: true });
        const updated = await this.props.update({ bio });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    handleChange = (e) => {
        const target = e.target;
        const bio = target.value;
        this.setState({ bio })
    }

    render = () => {
        const { loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Profile Overview' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <div className='form-group'>
                        <div className='form-control'>
                            <label>Description*</label>
                            <textarea
                                required
                                maxLength='500'
                                value={this.state.bio}
                                onChange={this.handleChange}
                                rows='5'
                                name='description' />
                        </div>
                    </div>
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}