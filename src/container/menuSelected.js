import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMenu } from '../action/indexAction';
import { HashLink as Link } from 'react-router-hash-link';
import Reservation from '../component/reservation';

class MenuSelected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: 3,
            price: 0,
            date: '',
            checkMenu: true,
            availableDate: ''
        }
        // this.updatePrice = this.updatePrice.bind(this);
        // this.commandMenu = this.commandMenu.bind(this);
    }
    componentWillMount = async () => {
        await this.props.selectMenu(this.props.match.params.id);
        const { menu } = this.props;
        if (menu) {
            this.setState({
                price: menu.price,
                totalPrice: menu.price,
                availableDate: menu.cooker.dates
            })
        }
    }
    displayMenu = () => {
        const { menu } = this.props;
        if (menu) {
            return (
                <div className="detail">
                    <img src={"data:image/jpg;base64," + menu.picture} className="img-selected" alt="" />
                    <h3>{menu.title}</h3>
                    <h4>Entrée</h4>
                    <p>{menu.start}</p>
                    <h4>Plat</h4>
                    <p>{menu.dish}</p>
                    <h4>Dessert</h4>
                    <p>{menu.dessert}</p>
                    <h4>Prix</h4>
                    <p><strong>{menu.price}€</strong> par personnes</p>
                </div>
            );
        }
    }
    displayComment = () => {
        if (this.props.menu && !Array.isArray(this.props.menu)) {
            const comments = this.props.menu.comments;
            return comments.map((comment, i) => {
                if (i < this.state.comment) {
                    return (
                        <div key={comment.id} className="comment">
                            <img src={"data:image/jpg;base64," + comment.user.picture} className="img-user" alt="" />
                            <div>
                                <h6>{comment.user.first_name}</h6>
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    )
                }
                return '';
            });
        }
    }
    displayCooker = () => {
        if (this.props.menu && !Array.isArray(this.props.menu)) {
            const cooker = this.props.menu.cooker;
            return (
                <div className="cooker">
                    <img src={"data:image/jpg;base64," + cooker.picture} className="image-cooker" alt="" />
                    <div>
                        <p>A props du chef ...</p>
                        <h6><Link scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} to={`/cooker/${cooker.id}/#chef-page`}>{`${cooker.first_name} ${cooker.last_name}`}</Link></h6>
                    </div>
                </div>
            )
        }
    }
    // commandMenu = (e) => {
    //     if (this.props.user) {
    //         if (this.props.user.type === 'user') {
    //             this.setState({
    //                 checkMenu: false
    //             })
    //         }
    //     }
    // }
    moreComments = () => {
        this.setState({
            comment: this.state.comment + 3
        })
    }

    render() {
        return (
            <div className="container" id="menu-selected">
                <h1 className="text-center">Reservez un menu</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="menu">
                            {this.displayMenu()}
                            {this.displayCooker()}
                            <div className="comment-content">
                                <h4 className="text-center">Les avis :</h4>
                                {this.displayComment()}
                                <p className="text-center"><button onClick={() => this.moreComments()} className="btn-more">Afficher plus</button></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Reservation
                            price={this.state.price}
                            menu={this.props.menu}
                        />
                    </div>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        menu: state.menu,
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectMenu
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuSelected);