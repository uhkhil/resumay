import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { Institute } from './Institute';
import { EducationEditModal } from './EducationEditModal';
import { NoData } from '../NoData/NoData';

export class Education extends React.Component {

    state = {
        isOpen: false
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const institutes = this.props.data;
        const { isOpen } = this.state;
        return (
            <div className="block">
                <BlockHeader mode={this.props.mode} title="Education" icon='graduation-cap' edit={this.toggleModal} />
                {institutes.map((institute, idx) => <Institute key={idx} data={institute} />)}
                <NoData condition={institutes.length} />
                {
                    isOpen ?
                        <EducationEditModal data={institutes} toggleModal={this.toggleModal} update={this.props.update} />
                        : null
                }
            </div>
        )
    }
}