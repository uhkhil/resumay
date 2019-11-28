import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'

const Certificate = (props) => {
    const cert = props.data;
    console.log('TCL: Certificate -> cert', cert);
    return (
        <div className='block'>
            <h4>{cert.certificationName}</h4>
            <p>{cert.description}</p>
        </div>
    )
}

export class Certification extends React.Component {
    render() {
        const certifications = this.props.data;
        return (
            <div className="block">
                <BlockHeader title='Certification' />
                {certifications.map(cert => <Certificate data={cert} />)}
            </div>
        )
    }
}