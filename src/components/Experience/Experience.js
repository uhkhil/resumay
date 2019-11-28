import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'
import { Company } from '../Company/Company';

export class Experience extends React.Component {
    render() {
        const companies = this.props.data;
        return (
            <div className="block">
                <BlockHeader title='Work Experience' />
                {companies.map(company => <Company data={company} />)}
            </div>
        )
    }
}