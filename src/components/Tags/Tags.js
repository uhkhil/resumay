import React from 'react'
import './Tags.css'
import { Tag } from '../Tag/Tag'
import { BlockHeader } from '../BlockHeader/BlockHeader'

export class Tags extends React.Component {
    render() {
        const tags = [{
            _id: '1',
            value: 'Angular'
        },
        {
            _id: '2',
            value: 'React Native'
        }];
        return (
            <div className="block tags-container">
                <BlockHeader title='Highlights' edit={() => alert('Coming soon.')} />
                {tags.map((tag, idx) => <Tag key={idx} _id={tag._id} value={tag.value} />)}
            </div>
        )
    }
}