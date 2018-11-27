import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormUser from '../component/formUser';
import UserReservation from '../component/userReservation';

class ProfilUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    userNotFind() {
        return (
            <div className="user-not-find">
                <h3>Cette section est inaccessible si vous n'êtes pas connecter</h3>
            </div>
        )
    }
    userFind(user) {
        return (
            <div className="profil-user container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Mon espace perso</h2>
                        <div className="user-card-form">
                            <FormUser />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="user-reservation">
                            <h2 className="text-center">Vos réservations</h2>
                            <UserReservation
                                reservations={user.reservations}
                                token={user.token}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    render() {
        console.log(this.props.user)
        const user = this.props.user ? this.props.user : '';
        return (
            <div>
                {user.token ? this.userFind(user) : this.userNotFind()}
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilUser);