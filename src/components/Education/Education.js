import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { Institute } from '../Institute/Institute';

export class Education extends React.Component {
    render() {
        const education = this.props.data
        return (
            <div className="block">
                <BlockHeader title="Education" />
                {education.map(institute => <Institute data={institute} />)}
            </div>
        )
    }
}