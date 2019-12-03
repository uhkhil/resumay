import React from 'react'
import './Modal.css'


export class Modal extends React.Component {

    state = {
        submitting: false
    }

    submit = async () => {
        this.setState({ submitting: true })
        await this.props.submit();
        this.setState({ submitting: false })
    }

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
                            <button
                                className="button button-primary close-modal"
                                onClick={this.submit}
                                disabled={this.state.submitting}>{!this.state.submitting ? 'Update' : 'Submitting...'}</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}