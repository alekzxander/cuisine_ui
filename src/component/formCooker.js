import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCookerProfil } from '../action/indexAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FormCooker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            firstname: '',
            lastname: '',
            id: '',
            picture: '',
            preview: null
        }
    }
    componentDidMount = () => {
        const { user } = this.props;
        if (user.token) {
            this.setState({
                firstname: user.firstname,
                lastname: user.lastname,
                id: user.id,
                picture: user.picture,
                presentation: user.presentation
            });
        }
    }
    handleChange(event) {
        if (event.target.files.length === 1) {
            this.setState({
                preview: URL.createObjectURL(event.target.files[0]),
                file: event.target.files[0]
            });
        } else {
            this.setState({
                file: null
            })
        }
    }
    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(event) {
        const { lastname, firstname, presentation } = event.target;
        event.preventDefault();
        this.props.updateCookerProfil(this.props.user.id, this.props.user.token, firstname.value, lastname.value, this.state.file, presentation.value)
        return false
    }
    render() {
        const { picture, firstname, lastname, preview, presentation, file } = this.state;
        return (
            <form onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleForm(e)}>
                <div className="form-group image-content">
                    {file ? <img src={preview} className="image-user" alt="avatar" /> : <img src={"data:image/jpg;base64," + picture} alt="avatar" className="image-user" />}
                    <div>
                        <label className="picture" htmlFor="avatar"><FontAwesomeIcon icon="plus-circle" /></label>
                        <input
                            type="file"
                            name="avatar"
                            className="form-control picture-file"
                            id="avatar"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
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
                    <label htmlFor="presentation">A propos de vous</label>
                    <textarea className="form-control" rows="10" value={presentation} name="presentation" id="presentation" >
                        {presentation}
                    </textarea>
                    {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
                </div>
                <p className="text-center">   <button type="submit" className="btn-submit">
                    Sauvegarder mes modifications
          </button></p>
            </form>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateCookerProfil }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormCooker);