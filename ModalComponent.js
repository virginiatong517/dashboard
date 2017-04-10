import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            onOpen: this.props.onOpen,
            onClose: this.props.onClose
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            show: nextProps.show
        });
    }

    close = () => {
        this.setState({
            show: false 
        });
        if (this.state.onClose) {   // if onClose function is defined by parent, then call it
            this.state.onClose();
        }
    }

    render() {
        return(
            <Modal show={this.state.show}
                onHide={this.close}>
                <Modal.Header closeButton>
                    {this.props.modalHeader}
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.modalFooter}
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalComponent;