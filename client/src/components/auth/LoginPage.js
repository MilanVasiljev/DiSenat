import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from "../../actions/authAction";
import {getCurrentProfile} from "../../actions/profileActions";


class LoginPage extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        // if(this.props.auth.isAuthenticated){
        //     this.props.history.push('/dashboard');
        // }
    }

    componentWillReceiveProps(nextProps){

        if (nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
        // if(this.props.auth.isAuthenticated){
        //     this.props.history.push('/dashboard');
        // }
        // this.props.getCurrentProfile();
        // window.location.reload();
    }


    render() {

        const {errors} = this.state;

        return (
            <div className="user-nav">
                <form onSubmit={this.onSubmit} className="user-nav" method="POST">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        className={classnames('text-input text-input__input', {
                            'invalidreg': errors.email
                        })}
                        />
                    {/*{errors.email && (<div className="invalid-message"><p className="invalid-message">{errors.email}</p></div>)}*/}
                    <input
                        type="password"
                        placeholder="Šifra"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className={classnames('text-input text-input__input', {
                            'invalidreg': errors.password
                        })}/>
                    {/*{errors.email && (<div className="invalid-message"><p className="invalid-message">{errors.email}</p></div>)}*/}
                    <button
                        type="submit"
                        value="posalji"
                        className="contact-button contact-button--login" href="/">Uloguj se</button>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, { loginUser, getCurrentProfile })(LoginPage);