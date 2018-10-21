import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerUser } from '../action/indexAction';
import { withRouter } from "react-router";


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

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
        <div>
            <div>
                <input {...input} className="form-control" placeholder={label} type={type} />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <form onSubmit={handleSubmit(({ firstNameUser, lastNameUser, emailUser, adresseUser, phoneUser, passwordUser }) => this.props.registerUser(firstNameUser, lastNameUser, emailUser, adresseUser, phoneUser, passwordUser, this.props.history))}>
                <div className="form-group">
                    <Field
                        name="firstNameUser"
                        type="text"
                        component={renderField}
                        label="Prenom"
                    />
                </div>
                <div className="form-group">
                    <Field
                        name="lastNameUser"
                        type="text"
                        component={renderField}
                        label="Nom">
                    </Field>
                </div>
                <div className="form-group">
                    <Field name="adresseUser" type="text" component={renderField} label="Adresse" />
                </div>
                <div className="form-group">
                    <Field name="phoneUser" type="number" component={renderField} label="Téléphone" />
                </div>
                <div className="form-group">
                    <Field name="emailUser" type="email" component={renderField} label="Email" />
                </div>
                <div className="form-group">
                    <Field name="passwordUser" type="password" component={renderField} label="Mot de passe" />
                </div>
                <div>
                    <p className="text-center">   <button type="submit" className="btn-submit" disabled={submitting}>
                        Inscrivez-vous
          </button></p>
                </div>
            </form>
        );
    }
}

const postNewPost = reduxForm({
    form: 'RegisterUser',
    warn,
    validate
})(RegisterUser);
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ registerUser }, dispatch)
}
export default withRouter(connect(null, mapDispatchToProps)(postNewPost));