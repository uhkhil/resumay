import React from 'react';
import { BlockHeader } from '../BlockHeader/BlockHeader';
import { Certificate } from './Certificate';
import { CertificationEditModal } from './CertificationEditModal';

export class Certification extends React.Component {

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
                <BlockHeader mode={this.props.mode} title="Certification" icon='certificate' edit={this.toggleModal} />
                {institutes.map((institute, idx) => <Certificate key={idx} data={institute} />)}
                {isOpen ?
                    <CertificationEditModal data={institutes} toggleModal={this.toggleModal} update={this.props.update} />
                    : null}
            </div>
        )
    }
}