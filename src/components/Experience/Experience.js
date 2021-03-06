import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { Company } from './Company';
import { ExperienceEditModal } from './ExperienceEditModal';
import { NoData } from '../NoData/NoData';

export class Experience extends React.Component {

    state = {
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const companies = this.props.data;
        const { isOpen } = this.state;
        return (
            <div className="block">
                <BlockHeader mode={this.props.mode} title="Work Experience" icon='briefcase' edit={this.toggleModal} />
                {companies.map((company, idx) => <Company key={idx} data={company} />)}
                <NoData condition={companies.length} />
                {
                    isOpen ?
                        <ExperienceEditModal data={companies} toggleModal={this.toggleModal} update={this.props.update} />
                        : null
                }
            </div>
        )
    }
}