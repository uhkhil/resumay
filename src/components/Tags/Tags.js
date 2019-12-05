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
        const { mode, update } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="block">
                <BlockHeader mode={mode} title="Highlights" edit={this.toggleModal} />
                <div className='block-content'>
                    {
                        tags.length ?
                            <div className='tag-list'>
                                {tags.map((tag, id) => <span key={id} className='tag'>{tag}</span>)}
                            </div> : null
                    }
                </div>
                {
                    isOpen ?
                        <TagsEditModal data={tags} toggleModal={this.toggleModal} update={update} />
                        : null
                }
            </div>
        )
    }
}