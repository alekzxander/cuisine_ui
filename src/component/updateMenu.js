import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { updateMenu } from '../action/indexAction';
import Types from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class UpdateMenu extends React.Component {
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
            boxSelected: []
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    componentWillMount = async () => {
        const currentTypes = [];
        if (this.props.menu) {
            const menuSelected = this.props.menu.filter((menu) => {
                if (menu.id === this.props.menuId) {
                    return menu;
                }
                return '';
            });
            const menu = menuSelected[0];
            console.log(menu)
            menu.type_has_menus.forEach((type) => {
                currentTypes.push(type.type_id);

            });
            this.setState({
                idMenu: menu.id,
                title: menu.title,
                picture: menu.picture,
                start: menu.start,
                dish: menu.dish,
                dessert: menu.dessert,
                price: menu.price,
                draftCase: menu.draft,
                typeSelected: currentTypes,
                types: currentTypes
            });
        }
    }
    handleForm(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChangeBox = async () => {
        const getBox = [];
        const selectBox = document.querySelectorAll('.container-check input');
        selectBox.forEach((box) => {
            if (box.checked) {
                getBox.push(box.id)
            }
        });
        await this.setState({
            boxSelected: getBox
        });
    }
    handleSubmit(event) {
        const { start, dish, dessert, title, price } = event.target;
        event.preventDefault();
        this.props.handleMenu()
        this.props.updateMenu(
            this.props.user.token,
            this.state.idMenu,
            title.value,
            start.value,
            dish.value,
            this.state.draftCase,
            price.value,
            dessert.value,
            this.state.file,
            this.state.boxSelected);
        return false
    }
    getTypes(types) {
        this.setState({
            types
        });
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

    handleDraft = (e) => {
        if (e.target.checked) {
            this.setState({
                draftCase: true
            });
        } else {
            this.setState({
                draftCase: false
            });
        }
    }
    render() {
        const { title, start, dish, dessert, price, draftCase, preview, file, picture, typeSelected } = this.state;
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
                {file ? <p className="text-center"><img src={preview} className="preview-menu" alt="aperçu du menu" /></p> : <p className="text-center"><img src={"data:image/jpg;base64," + picture} alt="aperçu du menu" className="preview-menu" /></p>}
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
                            <input type="checkbox" onChange={(e) => this.handleDraft(e)} checked={draftCase} name="draft" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <h5 className="choice-type" onClick={this.toggle}>Choisissez le type de cuisine <FontAwesomeIcon icon="angle-down" /></h5>
                <Collapse isOpen={this.state.collapse}>
                    <div className="row">
                        <Types
                            selected={typeSelected}
                            handleChangeBox={this.handleChangeBox}

                        />
                    </div>
                </Collapse>

                <div>
                    <p className="text-center">   <button type="submit" className="btn-submit">
                        Mettre à jour le menu
          </button></p>
                </div>
            </form>
        </div >);
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateMenu,
    }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        menu: state.menu
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateMenu);