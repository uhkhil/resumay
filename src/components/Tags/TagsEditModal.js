import React from 'react';
import { Modal } from '../Modal/Modal';
import { cloner } from '../../utils/Utils';

export class TagsEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: props.data,
            typedTag: '',
            loading: false
        };
    }

    submit = async ev => {
        ev.preventDefault();
        const { tags } = this.state;
        this.setState({ loading: true });
        const updated = await this.props.update({ tags });
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
        const typedTag = target.value;
        this.setState({ typedTag })
    }

    addSkill = () => {
        const arr = [...this.state.tags];
        const { typedTag } = this.state;
        const skillName = typedTag.trim();
        if (skillName) {
            arr.push(skillName);
        } else {
            return;
        }
        this.setState({ tags: arr, typedTag: '' });
    }

    removeSkill = (skillId) => {
        const arr = [...this.state.tags]
        arr.splice(skillId, 1);
        this.setState({ tags: arr });
    }

    keyUp = (ev) => {
        const keyCode = ev.keyCode;
        if (keyCode === 13) {
            this.addSkill()
        }
    }


    render = () => {
        const { loading, tags, typedTag } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Highlights' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <div className='form-group'>
                        <div className='form-control'>
                            <label>Skills</label>
                            <textarea type='text' className='textarea-skills' placeholder='Full stack developer ⏎' rows='1' maxLength='30' onChange={this.handleChange} onKeyUp={this.keyUp} value={typedTag} name='tagName' />
                            <div className='tag-list'>
                                {tags.map((skill, skillIdx) => <span className='tag clickable' onClick={this.removeSkill.bind(null, skillIdx)}>{skill}</span>)}
                            </div>
                        </div>
                    </div>
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}