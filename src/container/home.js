import React from 'react'
import menu from '../images/menu.svg';
import calendar from '../images/calendar.svg';
import table from '../images/table.svg';
import Comment from '../component/comment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commentHome, menuHome } from '../action/indexAction';
import { HashLink as Link } from 'react-router-hash-link';

import good from '../images/goodNote.svg';
import bad from '../images/badNote.svg';
import Menu from '../component/menu';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount = () => {
        this.props.commentHome();
        this.props.menuHome();
    };
    getGoodNote = (note) => {
        let result = []
        for (let i = 0; i < note; i++) {
            result.push(good);
        }
        return result;
    }
    getBadNote = (note) => {
        let result = [];
        const badNote = 5 - note;
        for (let i = 0; i < badNote; i++) {
            result.push(bad);
        }
        return result;
    }
    displayComment = () => {
        const { comments } = this.props;
        if (comments) {
            return comments.map((comment, i) => {
                if (i < 4) {
                    return (
                        <div key={comment.id} className="col-md-3">
                            <Comment
                                image={"data:image/jpg;base64," + comment.user.picture}
                                alt={'user profil'}
                                goodNote={this.getGoodNote(comment.score)}
                                badNote={this.getBadNote(comment.score)}
                                name={`${comment.user.first_name} ${comment.user.last_name}`}
                                text={comment.body}
                            />
                        </div>
                    )
                }
                return '';
            });
        }
        return '';
    };
    displayMenu = () => {
        const { menus } = this.props;
        if (menus && menus.length > 1) {
            return menus.map((menu, i) => {
                if (i < 3 && menu.cooker) {
                    return (
                        <div key={menu.id} className="col-md-4">
                            <Menu
                                image={"data:image/jpg;base64," + menu.picture}
                                title={menu.title}
                                chef={`${menu.cooker.last_name} ${menu.cooker.first_name}`}
                                type={menu.type_has_menus}
                                price={menu.price}
                                idMenu={menu.id}
                                cookerId={menu.cooker.id}
                            />
                        </div>)
                }
                return '';

            })
        }
    }

    render() {
        return (<div className="home-page">
            <h3 className="text-center">Comment ça marche ?</h3>

            <div className="container">
                <div className="picto-work">
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-center"><img src={menu} alt="" className="picto" /></p>
                            <h5 className="text-center">Choisissez un menu</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem numquam sit tenetur quod. </p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-center"><img src={calendar} className="picto" alt="" /></p>
                            <h5 className="text-center">Réservez une date</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem numquam sit tenetur quod. </p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-center"><img src={table} className="picto" alt="" /></p>
                            <h5 className="text-center">Le cuisinier viens chez vous</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta autem numquam sit tenetur quod. </p>

                        </div>
                    </div>
                    <p className="text-center"><button style={{ height: 'auto' }} className="btn-zot"><Link to="/menus#menu-page" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Découvrez les menus <br /> de nos chefs</Link></button></p>
                </div>
                <div className="user-comment-home">
                    <h3 className="text-center">Les avis de nos utilisateurs</h3>
                    <div className="row">
                        {this.displayComment()}
                    </div>
                </div>
            </div>
            <h3 className="text-center menu-title">Les menus du moment</h3>
            <div className="menu-home">

                <div className="row">
                    {this.displayMenu()}
                </div>
            </div>


        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        comments: state.comment,
        menus: state.menu
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ commentHome, menuHome }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);