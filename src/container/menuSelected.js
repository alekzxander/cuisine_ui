import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMenu } from '../action/indexAction';
import { HashLink as Link } from 'react-router-hash-link';

class MenuSelected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: 3,
            price: 0,
            totalPrice: 0,
            date: '',
            checkMenu: true,
        }
        this.updatePrice = this.updatePrice.bind(this);
        this.commandMenu = this.commandMenu.bind(this);
    }
    componentWillMount = async () => {
        await this.props.selectMenu(this.props.match.params.id);
        const { menu } = this.props;
        if (menu) {
            this.setState({
                price: menu.price,
                totalPrice: menu.price
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
                        <h6><Link to={`/cooker/${cooker.id}`}>{`${cooker.first_name} ${cooker.last_name}`}</Link></h6>
                    </div>
                </div>
            )
        }
    }
    commandMenu = (e) => {
        if (this.props.user) {
            if (this.props.user.type === 'user') {
                this.setState({
                    checkMenu: false
                })
            }
        }
    }
    moreComments = () => {
        this.setState({
            comment: this.state.comment + 3
        })
    }
    updatePrice = (e) => {
        const guess = e.target.value;
        this.setState({
            totalPrice: this.state.price * guess
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
                        <div className="reservation">
                            <InfiniteCalendar
                                width={"100%"}
                                height={400}
                                onSelect={this.commandMenu}
                                locale={{
                                    locale: require('date-fns/locale/fr'),
                                    headerFormat: 'dddd, D MMM',
                                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                                    blank: 'Aucune date selectionnee',
                                    todayLabel: {
                                        long: 'Aujourd\'hui',
                                        short: 'Auj.'
                                    }
                                }}
                                theme={{
                                    selectionColor: '#FE2B00',
                                    textColor: {
                                        default: '#333',
                                        active: '#FFF'
                                    },
                                    weekdayColor: '#FE2B00',
                                    headerColor: ' rgba(254, 38, 0, 0.66)',
                                    floatingNav: {
                                        background: ' rgba(254, 123, 0, 0.56)',
                                        color: '#FFF',
                                        chevron: '#FFA726'
                                    }
                                }}
                            />
                            <div className="choice-guess">
                                <div className="guess">
                                    <p>Nombre de convives</p>
                                    <p><strong>{this.state.price}€</strong> par personne</p>

                                </div>
                                <div className="total-price">
                                    <select id="monselect" onChange={this.updatePrice}>
                                        <option value="2">2 personne</option>
                                        <option value="4">4 personnes</option>
                                        <option value="6">6 personnes</option>
                                        <option value="8">8 personnes</option>
                                        <option value="10">10 personnes</option>
                                        <option value="12">12 personnes</option>
                                    </select>
                                    <p>Total : <strong>{this.state.totalPrice}€</strong></p>
                                </div>

                                <p className="text-center">
                                    <button className="btn-zot" disabled={this.state.checkMenu} >
                                        Reserver cette presentation
                                    </button>
                                </p>
                            </div>
                        </div>
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