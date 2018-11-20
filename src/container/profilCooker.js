import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormCooker from '../component/formCooker';
import { menuByCooker, removeMenu } from '../action/indexAction';
import AdminMenu from '../component/adminMenu';
import FormMenu from '../component/formMenu';
import UpdateMenu from '../component/updateMenu';
import CookerCalendar from '../component/cookerCalendar';
import { withRouter } from 'react-router-dom';

class ProfilCooker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextMenu: 'display',
            menuSelected: ''
        }
    }
    componentWillMount = () => {
        this.props.menuByCooker(this.props.match.params.id);
    }
    handleChange = (context) => {
        this.setState({
            contextMenu: context
        });
    }
    handleRemove = (id) => {
        this.props.removeMenu(id, this.props.user.token)
    }
    updateContext = (id) => {
        this.setState({
            contextMenu: 'update',
            menuSelected: id
        });
    }

    displayMenus = () => {
        const { menus } = this.props;
        if (menus && menus.length > 0) {
            return menus.map((menu) => {
                return (
                    <div className="col-lg-6" key={menu.id}>
                        <AdminMenu
                            pictureCard={"data:image/jpg;base64," + menu.picture}
                            title={menu.title}
                            removeMenu={() => this.handleRemove(menu.id)}
                            update={() => this.updateContext(menu.id)}
                            type={menu.type_has_menus}
                            draft={menu.draft}
                        />
                    </div>
                )
            })
        }
    }

    createMenu = () => {
        return (
            <div className="col-lg-12 ">
                <FormMenu
                    handleMenu={() => this.handleChange('display')} />
            </div>
        )
    }
    updateMenu = () => {
        return (
            <div className="col-lg-12 ">
                <UpdateMenu
                    handleMenu={() => this.handleChange('display')}
                    menuId={this.state.menuSelected}
                />

            </div>
        )
    }
    displayCalendar = () => {
        return (
            <div className="col-lg-12">
                <CookerCalendar />
            </div>
        )
    }
    menuContext = () => {
        const { contextMenu } = this.state;
        switch (contextMenu) {
            case 'display':
                return this.displayMenus();
            case 'create':
                return this.createMenu();
            case 'update':
                return this.updateMenu();
            case 'calendar':
                return this.displayCalendar();
            default:
                return '';
        }
    }
    render() {
        const { contextMenu } = this.state;
        console.log(this.props.user)
        if (this.props.user.token) {
            return (
                <div id="profil-cooker">
                    <div className="profil-user container">
                        <div className="selector-control">
                            {contextMenu === 'display' ? <button style={{ height: '45px' }} className="btn-zot" onClick={() => this.handleChange('create')}>Ajouter un menu</button> : <button className="btn-zot" onClick={() => { this.handleChange('display'); this.props.menuByCooker(this.props.user.id) }}>Afficher les menus</button>}
                            <p><button style={{ marginLeft: '20px' }} onClick={() => this.handleChange('calendar')} className="btn-zot">Calendrier</button></p>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 user-card-form">
                                <FormCooker
                                />
                            </div>
                            <div className="col-lg-8 menu-cooker-admin">
                                <div className="row">
                                    {this.menuContext()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <div className="user-not-find">
                    <h3>Cette section est inaccessible si vous n'êtes pas connecter</h3>
                </div>
            )
        }

    }
}
const mapStateToProps = (state) => {
    return {
        menus: state.menu,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ menuByCooker, removeMenu }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilCooker));