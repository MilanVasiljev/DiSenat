import React, {Component} from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Widget, addResponseMessage  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import ChatContainer from './ChatContainer';



import {getCurrentProfile} from "../../actions/profileActions";
import {getProfiles} from "../../actions/profileActions";
import {USER_CONNECTED,LOGOUT} from '../../Events';
import LoginForm from './LoginForm'


const socketUrl = "localhost:7000";
class Chat extends Component {

    constructor(props){
        super(props);

        this.state = {
            socket:null,
            user: null
        };
    }

    componentWillMount(){
        this.initSocket();
    }

    componentDidUpdate(){
        // console.log('props su: ' + props)
        console.log('props su: ' + this.props.location.state.korisnik)
        // this.setUser(this.props.location.state)
    }

    componentWillReceiveProps(){
        // console.log('props su: ' + this.props.location.state)
    }

    componentWillUnmount(){
        this.logout;
        window.location.reload()
        console.log('Unlogged')
    }

    initSocket = () => {
        const socket = io(socketUrl)
        socket.on('connect', () => {
            console.log("Connected")
        })
        this.setState({socket})
        // console.log(this.state.socket)
    }

    setUser = (user) => {
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user)
        this.setState({user})
    }

    logout = () => {
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user: null})
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getProfiles();

    }

    // handleNewUserMessage = (newMessage) => {
    //
    //     const {profile} = this.props;
    //     let user = '';
    //
    //     if(profile.profile === null) {
    //         console.log('Ucitavam')
    //     } else {
    //         user = this.props.profile.profile.user.firstname;
    //         let message = `${user}: ${newMessage}`
    //
    //     }
    // }
    //
    // handleNewResponseMessage = (response) => {
    //     addResponseMessage(response);
    // }

    render() {

        const {socket, user } = this.state;

        const {profile} = this.props;

        //     const {korisnik} = this.props.location.state
        // console.log('Korisnik kad stigne: ' + korisnik)
        // if(this.state.user === null && korisnik !== null) {
        //     this.setState({user: korisnik})
        //
        // }
        //     console.log('Korisnik u stejtu: ' + this.state.user)

        // if(profile.profile === null) {
        //     console.log('Ucitavam')
        // } else {
        //     const myself = this.props.profile.profile.user.firstname;
        //     console.log(myself)
        //
        // }

        return (



            <div className="container">
                {!user ?
                    <LoginForm profile={profile} socket={socket} setUser={this.setUser}/>
                :
                    <ChatContainer socket={socket} user={user} logout={this.logout} />
                    }

                    <Widget
                    title={'DiSenat Chat'}
                    handleNewUserMessage={this.handleNewUserMessage}
                    subtitle=''
                    senderPlaceHolder='Nova poruka'
                />
            </div>
        );
    }
}

Chat.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});



export default connect(mapStateToProps, {getCurrentProfile, getProfiles})(Chat);