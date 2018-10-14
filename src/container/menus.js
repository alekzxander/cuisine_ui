import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuHome } from '../action/indexAction';
import Menu from '../component/menu';
import axios from 'axios';

class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: undefined
        }
    }
    componentDidMount = async () => {
        this.props.menuHome();
        const getTypes = await axios('http://localhost:3001/types');
        this.setState({
            types: getTypes.data.types
        });
    };
    displayMenu = () => {
        if (this.props.menus) {
            return this.props.menus.map((menu) => {
                return (
                    <div key={menu.id} className="col-md-4">
                        <Menu
                            image={require(`../images/${menu.picture}`)}
                            title={menu.title}
                            chef={`${menu.cooker.last_name} ${menu.cooker.first_name}`}
                            type={menu.type_has_menus}
                            price={menu.price}
                            idMenu={menu.id}
                        />
                    </div>)
            })
        }
    }
    displayType = () => {
        if (this.state.types) {
            return this.state.types.map((type) => {
                return (
                    <div key={type.id} className="col-md-2">
                        <label className="container-check">{type.name}
                            <input type="checkbox" id={type.id} name={type.name} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div id="menu-page">
                <h3 className="text-center">Nos menus</h3>
                <div className="container">
                    <div className="type-cook">
                        <h3>Type de cuisine</h3>
                        <div className="row">
                            {this.displayType()}
                        </div>

                    </div>
                </div>
                <div className="menus-list">
                    <div className="row">
                        {this.displayMenu()}
                    </div>

                </div>
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
    return bindActionCreators({ menuHome }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Menus);