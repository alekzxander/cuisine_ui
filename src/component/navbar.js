import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem

} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, toggleModal } from '../action/indexAction';

class NavbarHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md" >
                    <Link className="navbar-brand" to="/">Accueil</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/menus#menu-page" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                >Nos menus</Link>
                            </NavItem>
                            <NavItem>
                                {this.props.user.token ? <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle style={{ color: '#FE2B00' }} nav caret>
                                        Mon profil
                </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Acceder à mon espace
                  </DropdownItem>

                                        <DropdownItem divider />

                                        <Link className="dropdown-item" style={{ color: '#FE2B00' }} onClick={() => this.props.logout()} to="/">Me deconnecter</Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown> : ''}
                            </NavItem>
                            {/* <NavItem> */}
                            {this.props.user.token ? '' : <NavLink style={{ cursor: 'pointer' }} onClick={() => this.props.toggleModal()}>Me connecter</NavLink>}
                            {/* <Link className="nav-link" to="/connexion#connect" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Me connecter</Link> */}
                            {/* </NavItem> */}



                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        menus: state.menu
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout,
        toggleModal
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);