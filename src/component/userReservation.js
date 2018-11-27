import React from 'react'
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addComment } from '../action/indexAction';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class UserReservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentForm: false,
            menuId: '',
            note: '1',
            comment: '',
            reservationId: '',
            textLengthInfo: 0
        }
        this.toggle = this.toggle.bind(this);
        this.handleText = this.handleText.bind(this);
    }
    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleText(e) {
        this.setState({
            textLengthInfo: e.target.value.length
        });
    }
    handleSubmit(event) {
        const { comment, note, menuId, reservationId } = this.state;
        this.props.addComment(this.props.token, comment, note, menuId, reservationId);
        this.setState({
            comment: '',
            note: ''
        });
        setTimeout(function () {
            this.setState({ commentForm: false });
        }.bind(this), 500)

        event.preventDefault();
        return false
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    displayReservation() {
        const { reservations } = this.props;
        return reservations.map((reservation, i) => {
            return (
                <div className="col-lg-6" key={i}>
                    <div className="reservation-card">
                        <h5>{reservation.menu.title}</h5>
                        <p>{moment(reservation.date_booking.date).format("DD-MM-YYYY")}</p>
                        <p>Nombre de personnes : {reservation.nb_guest}</p>
                        <p><strong>Prix total</strong> :  {reservation.menu.price * reservation.nb_guest} €</p>
                        <p onClick={this.toggle} className="details">Détails</p>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>{reservation.menu.title}</ModalHeader>
                            <ModalBody>
                                <h5>Entrée</h5>
                                <p>{reservation.menu.start}</p>
                                <div className="separator"></div>
                                <h5>Plat principal</h5>
                                <p>{reservation.menu.dish}</p>
                                <div className="separator"></div>
                                <h5>Dessert</h5>
                                <p>{reservation.menu.dessert}</p>
                            </ModalBody>
                        </Modal>
                        <p>{!reservation.commented ? <button onClick={() => this.setState({ reservationId: reservation.id, menuId: reservation.menu.id, commentForm: true })} className="btn-zot">Ajouter un commentaire</button> : <button disabled className="btn-zot">Déjà commenté</button>}</p>

                    </div>

                </div>
            )
        })
    }
    addComment() {
        const { comment, textLengthInfo } = this.state;
        return (
            <div className="col-md-12 comment-form">
                <button className="btn-zot" onClick={() => this.setState({ commentForm: false })}>Retour</button>
                <form onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleForm(e)}>
                    <div className="form-group">
                        <label htmlFor="comment">Dites nous ce que vous avez pensé de cette prestation (max 100 caractères)</label>
                        <textarea onChange={this.handleText} required name="comment" maxLength='100' id="comment" value={comment} className="form-control"></textarea>
                        <p className="infoLength">{textLengthInfo} / 100</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <select name="note" id="note" className="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p className="text-center">  <button type="submit" className="btn-submit">
                        Ajouter le commentaire
          </button></p>
                </form>
            </div>
        )
    }
    render() {
        const { commentForm } = this.state;
        return (
            <div className="row">
                {commentForm ? this.addComment() : this.displayReservation()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserReservation);