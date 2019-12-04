import React from 'react';
import { Modal } from '../Modal/Modal';

export class BioEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bio: props.data
        };
    }

    submit = async () => {
        const { bio } = this.state;
        this.setState({ loading: true });
        const updated = await this.props.update({ bio });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const bio = target.value;
        this.setState({ bio })
    }

    render = () => {
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Profile Overview' isOpen={isOpen} submit={this.submit} close={toggleModal}>
                <form className='form'>
                    <div className='form-group'>
                        <div className='form-control'>
                            <label>Description</label>
                            <textarea
                                minLength={10}
                                maxLength={500}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                rows={5}
                                name='description' />
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}