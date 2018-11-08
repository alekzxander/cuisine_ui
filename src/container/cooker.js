import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCooker } from '../action/indexAction';
import Menu from '../component/menu';
import good from '../images/goodNote.svg';
import bad from '../images/badNote.svg';
class Cooker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: 3
        }
    }
    componentWillMount = () => {
        this.props.selectCooker(this.props.match.params.id);
    }
    displayProfil = () => {
        const { cooker } = this.props;
        if (cooker) {
            const types = cooker.types.map((type) => {
                return ` - ${type.name} `;
            })
            return (
                <div className="card-cooker">
                    <img className="img-cooker" src={"data:image/jpg;base64," + cooker.picture} alt="cooker profil" />
                    <h5>{`${cooker.firstname} ${cooker.lastname}`}</h5>
                    <p>À propos : </p>
                    <p>{cooker.presentation}</p>
                    <h6>Type de cuisine : </h6>
                    <p className="type">{types}</p>
                </div>
            )
        }
    }
    average = () => {
        const { cooker } = this.props
        let num = [];
        let sum = 0;
        if (cooker) {
            const note = cooker.comments
            for (let i = 0; i < note.length; i++) {
                num.push(note[i].score)
            }
            for (let i = 0; i < num.length; i++) {
                sum += num[i];

            }
            return Math.round(sum / num.length);
        }

    }
    moreComments = () => {
        this.setState({
            comment: this.state.comment + 3
        })
    }
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
        const { cooker } = this.props;
        if (cooker) {
            return cooker.comments.map((comment, i) => {
                if (i < this.state.comment) {
                    return (
                        <div key={comment.id} className="comment">
                            <h6>{comment.user.first_name}</h6>
                            <p>{comment.body}</p>
                        </div>
                    )
                }
                return '';
            });
        }
    }

    displayMenus = () => {
        const { cooker } = this.props;
        if (cooker) {
            return cooker.menus.map((menu) => {
                return (
                    <div key={menu.id} className="col-lg-6">
                        <Menu

                            title={menu.title}
                            type={menu.type_has_menus}
                            price={menu.price}
                            idMenu={menu.id}
                            image={"data:image/jpg;base64," + menu.picture} alt={menu.title + "image"}
                        />
                    </div>
                )
            });
        }
    }

    render() {
        console.log(this.props.cooker)
        return (
            <div id="chef-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            {this.displayProfil()}
                            <div className="comment-content">
                                <h4 className="text-center">Note general :</h4>
                                <p className="text-center"> {this.getGoodNote(this.average()).map((note, i) => {
                                    return <img key={i} className="note" src={note} alt="note" />
                                })}
                                    {this.getBadNote(this.average()).map((note, i) => {
                                        return <img key={i} className="note" src={note} alt="note" />
                                    })}
                                </p>
                                <h4 className="text-center">Les avis :</h4>
                                {this.displayComment()}
                                <p className="text-center"><button onClick={() => this.moreComments()} className="btn-more">Afficher plus</button></p>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                {this.displayMenus()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectCooker
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        cooker: state.cooker
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cooker);