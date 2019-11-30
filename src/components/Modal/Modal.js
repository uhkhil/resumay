import React from 'react'
import './Modal.css'

export class Modal extends React.Component {
    render() {
        const className = this.props.isOpen ? 'modal-open' : ''
        return (
            <div className={"modal " + className}>
                <div className="modal-inner">
                    <div className="modal-content">
                        <h2>{this.props.title}</h2>
                        <hr style={{ margin: 0 }} />
                        <div className="modal-content-inner modal-form">
                            {this.props.children}
                        </div>
                        <hr className="modal-buttons-seperator" />
                        <div className="modal-buttons">
                            <button className="button close-modal" onClick={this.props.close}>Cancel</button>
                            {/* TODO: Get the submit call out */}
                            {/* <button className="button button-primary close-modal" onClick={this.props.submit}>Update</button> */}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}