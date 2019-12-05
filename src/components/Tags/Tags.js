import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { TagsEditModal } from './TagsEditModal';

export class Tags extends React.Component {

    state = {
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const tags = this.props.data;
        const { isOpen } = this.state;
        return (
            <div className="block">
                <BlockHeader mode={this.props.mode} title="Highlights" edit={this.toggleModal} />
                <div className='block-content'>
                    <div className='tag-list'>
                        {tags.map(tag => <span className='tag'>{tag}</span>)}
                    </div>
                </div>
                {
                    isOpen ?
                        <TagsEditModal data={tags} toggleModal={this.toggleModal} update={this.props.update} />
                        : null
                }
            </div>
        )
    }
}