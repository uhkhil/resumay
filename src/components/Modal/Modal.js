import React from 'react'
import './Modal.css'


export class Modal extends React.Component {
    render() {
        const { submitting, submit } = this.props;
        return (
            <div className="modal modal-open">
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
                            <button
                                className="button button-primary close-modal"
                                onClick={submit}
                                disabled={submitting}>{!submitting ? 'Update' : 'Updating...'}</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}