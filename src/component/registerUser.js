import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerUser } from '../action/indexAction';

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
            <label >{label}</label>
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
            <form onSubmit={handleSubmit(({ firstNameUser, lastNameUser, emailUser, adresseUser, phoneUser, passwordUser }) => this.props.registerUser(firstNameUser, lastNameUser, emailUser, adresseUser, phoneUser, passwordUser))}>
                <div className="form-group">
                    <Field
                        name="firstNameUser"
                        type="text"
                        component={renderField}
                        label="firstName"
                    />
                </div>
                <Field
                    name="lastNameUser"
                    type="text"
                    component={renderField}
                    label="lastName">
                </Field>
                <Field name="adresseUser" type="text" component={renderField} label="Adresse" />
                <Field name="phoneUser" type="number" component={renderField} label="Phone" />
                <Field name="emailUser" type="email" component={renderField} label="Email" />
                <Field name="passwordUser" type="password" component={renderField} label="Password" />
                <div>
                    <button type="submit" disabled={submitting}>
                        Submit
          </button>
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
export default connect(null, mapDispatchToProps)(postNewPost)