import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormUser from '../component/formUser';

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
    userFind() {
        return (
            <div className="profil-user container">
                <h2 className="text-center">Mon espace perso</h2>
                <div className="row">
                    <div className="user-card-form col-md-8">
                        <FormUser />
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.props.user.token ? this.userFind() : this.userNotFind()}
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