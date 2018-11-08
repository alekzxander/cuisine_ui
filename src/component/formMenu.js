import React from 'react';
import axios from 'axios';
import { createMenu } from '../action/indexAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FormMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            picture: null,
            start: '',
            dish: '',
            dessert: '',
            price: '',
            draftCase: false,
            preview: null,
            file: null,
            types: [],
            collapse: false,
            type: []
        }
        this.toggle = this.toggle.bind(this);
        this.handleDraft = this.handleDraft.bind(this);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    handleDraft() {
        this.setState({
            draftCase: !this.state.draftCase
        });
    }
    componentWillMount = async () => {
        const getTypes = await axios('http://localhost:3001/types');
        this.setState({
            types: getTypes.data.types
        });
    }
    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(event) {
        const { start, dish, dessert, title, price } = event.target;
        this.props.createMenu(this.props.user.token, title.value, start.value, dish.value, this.state.draftCase, price.value, dessert.value, this.state.file, this.state.type);
        event.preventDefault();
        this.props.handleMenu()
        return false
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
    filterMenus = () => {
        const getBox = [];
        const selectBox = document.querySelectorAll('.container-check input');
        selectBox.forEach((box) => {
            if (box.checked) {
                getBox.push(box.id)
            }
        });
        this.setState({
            type: getBox
        });
    }
    displayType = () => {
        if (this.state.types) {
            return this.state.types.map((type) => {
                return (
                    <div key={type.id} className="col-md-4">
                        <label className="container-check">{type.name}
                            <input onChange={() => this.filterMenus()} type="checkbox" id={type.id} name={type.name} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                )
            })
        }
    }
    render() {
        const { title, start, dish, dessert, price, preview, file } = this.state;
        return (<div className="form-menu">
            <h5 className="text-center">Ajouter un menu</h5>
            <form onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleForm(e)} >
                <div className="form-group">
                    <label htmlFor="picture">Image du menu</label>
                    <input type="file"
                        name="picture"
                        className="form-control"
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
                {file ? <p className="text-center"><img src={preview} className="preview-menu" alt="aperçu du menu" /></p> : <p>Aperçu de l'image</p>}
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text"
                        name="title"
                        className="form-control"
                        value={title}
                        maxLength="75"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start">Entrée</label>
                    <textarea
                        name="start"
                        className="form-control"
                        value={start}
                        maxLength="155"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dish">Plat principal</label>
                    <textarea
                        className="form-control"
                        name="dish"
                        value={dish}
                        maxLength="155"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dessert">Dessert</label>
                    <textarea
                        className="form-control"
                        name="dessert"
                        value={dessert}
                        maxLength="155"
                        rows="3"
                    />
                </div>
                <div className="menu-price">
                    <div className="form-group">
                        <label htmlFor="price">Prix par convive</label>
                        <input type="number"
                            className="form-control"
                            value={price}
                            name="price"
                        />
                    </div>
                    <div className="form-group draft-menu">
                        <label className="container-check">Brouillon (ne sera pas afficher sur le site)
                            <input onChange={this.handleDraft} type="checkbox" name="draft" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <h5 className="choice-type" onClick={this.toggle}>Choisissez le type de cuisine <FontAwesomeIcon icon="angle-down" /></h5>
                <Collapse isOpen={this.state.collapse}>
                    <div className="row">
                        {this.displayType()}
                    </div>
                </Collapse>
                <div>
                    <p className="text-center">   <button type="submit" className="btn-submit">
                        Creer le menu
          </button></p>
                </div>
            </form>
        </div >);
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createMenu }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormMenu);

