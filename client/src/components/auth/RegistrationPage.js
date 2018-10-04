import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registeruser } from "../../actions/authAction";

class RegistrationPage extends Component {

    constructor(){
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: '',
            preporuka: '',
            errors: {},
            modalOpen: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }

    }

     onChange = (event) => {
        this.setState({[event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            preporuka: this.state.preporuka
        }


        this.props.registeruser(newUser, this.props.history);
        this.setState({modalOpen: true})

    }


    render() {
        const { errors } = this.state;

        return (
            <div className="force-overflow container container__modal">
            <form noValidate onSubmit={this.onSubmit} className="contact-background center-form__registration" id="contact-form" method="POST">
                <h1 className="registracija-naslov">Zahtev za registraciju</h1>
                <br/><br/>

                <input
                    type="text"
                    placeholder="Ime"
                    name="firstname"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.firstname
                    })}
                    value={this.state.firstname}
                    onChange={this.onChange.bind(this)}
                    />
                    {errors.firstname && (<div className="invalid-message"><p className="invalid-message">{errors.firstname}</p></div>)}

                <input
                    type="text"
                    placeholder="Prezime"
                    name="lastname"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.lastname
                    })}
                    onChange={this.onChange}
                    value={this.state.lastname}
                    />
                {errors.lastname && (<div className="invalid-message"><p className="invalid-message">{errors.lastname}</p></div>)}


                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.email
                    })}
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                {errors.email && (<div className="invalid-message"><p className="invalid-message">{errors.email}</p></div>)}

                <input
                    type="password"
                    placeholder="Šifra"
                    name="password"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.password
                    })}
                    value={this.state.password}
                    onChange={this.onChange}
                    />
                    {errors.password && (<div className="invalid-message"><p className="invalid-message">{errors.password}</p></div>)}

                <input
                    type="password"
                    placeholder="Potvrdi šifru"
                    name="password2"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.password2
                    })}
                    value={this.state.password2}
                    onChange={this.onChange}
                    />
                    {errors.password2 && (<div className="invalid-message"><p className="invalid-message">{errors.password2}</p></div>)}

                <input
                    type="text"
                    placeholder="Preporuka"
                    name="preporuka"
                    className={classnames('text-input text-input__input text-input__input--veliko', {
                        'invalidreg': errors.preporuka
                    })}
                    value={this.state.preporuka}
                    onChange={this.onChange}
                    />
                {errors.preporuka && (<div className="invalid-message"><p className="invalid-message">{errors.preporuka}</p></div>)}
                <br/>

                <button
                    type="submit"
                    value="posalji"
                    className="contact-button contact-button__registration">Posalji</button>
            </form>
            </div>
        );
    }
}


RegistrationPage.propTypes = {
    registeruser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, { registeruser })(withRouter(RegistrationPage));