import React from 'react'
import './Tags.css'
import { Tag } from '../Tag/Tag'
import { BlockHeader } from '../BlockHeader/BlockHeader'

export class Tags extends React.Component {
    render() {
        const tags = this.props.data;
        return (
            <div className="block tags-container">
                <BlockHeader title='Hightlights' />
                {tags.map(tag => <Tag _id={tag._id} value={tag.value} />)}
            </div>
        )
    }
}