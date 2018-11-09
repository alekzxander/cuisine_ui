import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, toggleModal } from '../action/indexAction';
import { withRouter } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}


const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
        <div>
            {/* <label >{label}</label> */}
            <div>
                <input {...input} className="form-control" placeholder={label} type={type} />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={() => this.props.toggleModal()} className={this.props.className}>
                    <ModalHeader toggle={() => this.props.toggleModal()}>Connexion</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(({ email, password }) => this.props.login(email, password, this.props.history))}>

                            <div className="form-group">
                                <Field name="email" type="email" component={renderField} label="Email" />
                            </div>
                            <div className="form-group">

                                <Field name="password" type="password" component={renderField} label="Mot de passe" />
                            </div>
                            <div>
                                <p className="text-center"><button onClick={() => this.props.toggleModal()} type="submit" className="btn-submit" disabled={submitting}>
                                    Connexion
                            </button></p>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Link className="nav-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={() => this.props.toggleModal()} to="/connexion#connect" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Pas encore de compte ?</Link>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

const postNewPost = reduxForm({
    form: 'Login',
    validate
})(Login);
const mapStateToProps = (state) => {
    return {
        user: state.user,
        modal: state.modal
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login, toggleModal }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(postNewPost));