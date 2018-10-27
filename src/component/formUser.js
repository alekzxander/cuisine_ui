import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUserProfil } from '../action/indexAction';

class FormUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            firstname: '',
            lastname: '',
            adresse: '',
            phone: '',
            id: '',
            picture: '',
        }
    }
    componentDidMount = () => {
        const { user } = this.props;
        if (user.token) {
            this.setState({
                firstname: user.firstname,
                lastname: user.lastname,
                adresse: user.adresse,
                phone: user.phone,
                id: user.id,
                picture: user.picture,
            });
        }
    }

    handleSubmit(event) {
        const { lastname, firstname, adresse, phone, picture } = event.target;
        event.preventDefault();
        this.props.updateUserProfil(this.props.user.id, this.props.user.token, firstname.value, lastname.value, picture.value, adresse.value, phone.value)
        return false
    }
    handleChange(event) {
        if (event.target.files.length === 1) {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            });
        } else {
            this.setState({
                file: null
            })
        }
    }
    handleForm(e) {
        console.log([e.target.name])
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { picture, firstname, lastname, adresse, phone } = this.state;
        return (
            <form onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleForm(e)}>
                <div className="form-group image-content">
                    {this.state.file ? <img src={this.state.file} className="image-user" alt="avatar" /> : <img src={"data:image/jpg;base64," + picture} alt="avatar" className="image-user" />}
                    <label className="picture" htmlFor="picture">Changer de photo
                    <input
                            type="file"
                            name="picture"
                            className="form-control"
                            id="picture"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Prenom</label>
                    <input
                        name="firstname"
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstname}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input
                        name="lastname"
                        type="text"
                        value={lastname}
                        className="form-control"
                        id="lastname"
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="adresse">Adresse</label>
                    <input
                        name="adresse"
                        value={adresse}
                        type="text"
                        className="form-control"
                        id="adresses"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                        name="phone"
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                    />
                </div>

                <div>
                    <p className="text-center">   <button type="submit" className="btn-submit">
                        Sauvegarder mes modifications
          </button></p>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateUserProfil }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormUser);