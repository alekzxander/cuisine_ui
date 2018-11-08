import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class AdminMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="admin-card">
                <img src={this.props.pictureCard} alt="" />
                <h5>{this.props.title}</h5>
                <p className="text-center"><em>{this.props.type.map(types => ` ${types.type.name},`)}</em> </p>
                <div className="content">
                    <p><button onClick={() => this.props.update()} className="update">Modifier</button></p><p><button onClick={this.toggle} className="remove">Supprimer</button></p>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Suppression d'un menu</ModalHeader>
                    <ModalBody>
                        Êtes vous de vouloir supprimer ce menu ? Ce le supprimera de manière définitive.
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.props.removeMenu(); this.toggle() }}>Supprimer le menu</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Annulé</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}

export default AdminMenu;
