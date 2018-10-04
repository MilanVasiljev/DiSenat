import React, {Component} from 'react';

import {VERIFY_USER} from '../../Events';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            error: ""
        }
    }

    componentDidUpdate(){
        this.textInput.focus();
        this.handleSubmit('');
    }


    setUser = ({user, isUser}) => {
        console.log("setUser in Login is firing");
        console.log({user, isUser});
        if(isUser){
            // window.location.reload()
            // this.props.logout();
            this.setError("Vec postoji ovaj korisnik.")
        } else {
            console.log('1: user iz setUser: ' + user);
            this.props.setUser(user)
            this.setError("")
        }
    }

    handleSubmit = (e) => {
        // e.preventDefault();

        const {profile} = this.props;

        if (profile.profile === null) {
            console.log('Ucitavam')
        } else {
            if(this.props.profile.profile.user.firstname !== undefined) {
                const myself = this.props.profile.profile.user.firstname;

                const {nickname} = this.state;
                const {socket} = this.props;
                socket.emit(VERIFY_USER, myself, this.setUser)
                console.log("handle submit fired and this.state.nickname= " + this.state.nickname)
            }
        }
    }

    handleChange = (e) => {
        this.setState({nickname: e.target.value})
        console.log("text input change handler: " +this.state.nickname);
    }

    setError = (error) => {
        this.setState({error})
    }


    render() {



        const {nickname, error} = this.state;

        return (
            <div className = "login">

                <form onFocus={this.handleSubmit} onSubmit = {this.handleSubmit} className = "login-form" >
                    <label htmlFor="nickname">
                    </label>
                    <input
                        onFocus={this.handleSubmit}
                        ref={(input) => { this.textInput = input}}
                        autofocus="true"
                        type="text"
                        id="nickname"
                        // value={nickname}  p-edit not sure if this is needed?
                        onChange={this.handleChange}
                        placeholder={'Ukucaj nesto'}
                    />
                    <div className="error" > {error ? error : null} </div>
                </form>

            </div>
        );
    }
}

export default LoginForm;