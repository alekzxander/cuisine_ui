import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerCooker } from '../action/indexAction';
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

class RegisterCooker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <form onSubmit={handleSubmit(({ firstNameCook, lastNameCook, emailCook, passwordCook }) => this.props.registerCooker(firstNameCook, lastNameCook, emailCook, passwordCook, this.props.history))}>
                <div className="form-group">
                    <Field
                        name="firstNameCook"
                        type="text"
                        component={renderField}
                        label="Prenom"
                    />
                </div>
                <div className="form-group">
                    <Field
                        name="lastNameCook"
                        type="text"
                        component={renderField}
                        label="Nom">
                    </Field>
                </div>
                <div className="form-group">
                    <Field name="emailCook" type="email" component={renderField} label="Email" />
                </div>
                <div className="form-group">
                    <Field name="passwordCook" type="password" component={renderField} label="Mot de passe" />
                </div>
                <div>
                    <p className="text-center"><button type="submit" className="btn-submit" disabled={submitting}>
                        Inscrivez-vous
          </button></p>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(postNewPost));