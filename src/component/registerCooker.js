import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerCooker } from '../action/indexAction';

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
            <label >{label}</label>
            <div>
                <input {...input} className="form-control" placeholder={label} type={type} />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

class RegisterCooker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { handleSubmit, submitting } = this.props
        console.log(this.props.user)
        return (
            <form onSubmit={handleSubmit(({ firstNameCook, lastNameCook, emailCook, passwordCook }) => this.props.registerCooker(firstNameCook, lastNameCook, emailCook, passwordCook))}>
                <div className="form-group">
                    <Field
                        name="firstNameCook"
                        type="text"
                        component={renderField}
                        label="firstName"
                    />
                </div>
                <Field
                    name="lastNameCook"
                    type="text"
                    component={renderField}
                    label="lastName">
                </Field>
                <Field name="emailCook" type="email" component={renderField} label="Email" />
                <Field name="passwordCook" type="password" component={renderField} label="Password" />
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
    form: 'RegisterCooker',
    validate
})(RegisterCooker);
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ registerCooker }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(postNewPost)