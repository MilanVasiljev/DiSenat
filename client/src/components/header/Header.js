import React, { Component } from 'react';
import io from 'socket.io-client';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authAction";
import {clearCurrentProfile, getCurrentProfile} from "../../actions/profileActions";

import RegistrationImage from '../../images/registrationsheet.png';
import RegistrationPage from '../auth/RegistrationPage';
import ThanksForRegistering from '../auth/ThanksForRegistering';
import LoginPage from '../auth/LoginPage';
import {USER_CONNECTED, LOGOUT, VERIFY_USER} from '../../Events';



const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : 'transparent',
        backgroundImage       : `url(${RegistrationImage})`,
        backgroundSize        : 'cover',
        overflow              : 'hidden',
        border                : 'none',
        borderRadius          :  '10px'
    }
};

Modal.setAppElement('#root')

const socketUrl = "localhost:7000";
class Header extends Component {

    constructor() {
        super();

        this.state = {
            socket:null,
            user: null,
            nickname: "",
            error: "",
            modalIsOpen: false,
            thanksModalIsOpen: false,
            hasProfile: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openThanksModal = this.openThanksModal.bind(this);
        this.closeThanksModal = this.closeThanksModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openThanksModal() {
        this.setState({thanksModalIsOpen: true});
    }

    closeThanksModal() {
        this.setState({thanksModalIsOpen: false});
    }

    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        // window.location.reload();
    }


    // LOGINOVANJE NA CHAT
    componentWillMount(){
        this.initSocket();
    }

    componentDidMount(){
        this.props.getCurrentProfile();

    }

    componentDidUpdate(){
        let {profile, loading} = this.props.profile;

        if(profile){
            if(Object.keys(profile).length > 0) {
                if (this.state.hasProfile !== true)
                    this.setState({hasProfile: true})
            }
        }
    }

    // SOCKET HANDLERS


    initSocket = () => {
        const socket = io(socketUrl)
        socket.on('connect', () => {
            console.log("Connected")
        })
        this.setState({socket})
        // console.log(this.state.socket)
        // console.log('Nickname: ' + this.state.nickname);
    }

    setUser = (user) => {
        console.log('Setting the user')
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user)
        this.setState({user})
    }

    logout = () => {
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user: null})
    }

    setUserOld = ({user, isUser}) => {
        console.log("setUser in Login is firing");
        console.log({user, isUser});
        if(isUser){

            this.setError("Sorry, that nickname is already taken.")
        } else {
            console.log('Pozivam set user i saljem' + user)
            this.setUser(user)
            this.setError("")
        }
    }

    setError = (error) => {
        this.setState({error})
    }

    handleSubmit = (e) => {
        // e.preventDefault();

            if(this.state.nickname !== "") {
                const {nickname} = this.state;
                const {socket} = this.state;

                socket.emit(VERIFY_USER, nickname, this.setUserOld)

                console.log("handle submit fired and this.state.nickname= " + this.state.nickname)
            }

    }
    // END SOCKET HANDLERS

    render() {

        const {isAuthenticated, user} = this.props.auth;

            // console.log('Ima li profil: ' + this.state.hasProfile)

        let myname = user.firstname
        if(this.state.nickname === ""){
        this.setState({nickname: myname})
        } if(this.state.nickname === user.firstname) {
            let myCompleteName = this.state.nickname;
            // console.log(myCompleteName)

            // for (let i = 0; i < 1; i++) {
            //     // this.handleSubmit(myCompleteName);
            // }

        }

        const authLinks = (

                <div className="header">


                    <div className="user-nav--logo slideInLeft"><img className="disenat-logo"  src={require('../../images/splogo2.png')} alt=""/></div>


                    <div className="user-nav user-nav__left slideInLeft">
                        <Link className="user-nav--link" to="/"><i className="fas fa-home header-links-icons"></i>Početna</Link>
                        {this.state.hasProfile ? <Link to='/postovi' className="user-nav--link"><i className="fas fa-comments header-links-icons"></i>Postovi</Link> : null}
                        <Link to='/kompanije' className="user-nav--link"><i className="fas fa-building header-links-icons"></i>Kompanije</Link>
                        <Link to='/privredna-berza' className="user-nav--link"><i className="fas fa-business-time header-links-icons"></i>Privredna berza</Link>
                        <Link to='/vip-card' className="user-nav--link"><i className="fas fa-credit-card header-links-icons"></i>Vip Card</Link>
                        {/*<a className="user-nav--link" href="/">Privilege Club</a>*/}
                        {/*<a className="user-nav--link" href="/"><i className="fas fa-handshake header-links-icons"></i>Partneri</a>*/}
                        {/*<Link to='/blog' className="user-nav--link"><i className="fab fa-blogger-b header-links-icons"></i>Blog</Link>*/}
                        {/*<a className="user-nav--link" href="/">DiSenat</a>*/}
                        {/*<Link className="user-nav--link" to='/dashboard'>{user.firstname}</Link>*/}
                        {/*{user.role === 'admin' ? <a className="user-nav--link" href="/">Admin portal</a> : null}*/}
                    </div>


                    {this.state.hasProfile ? <Link
                        // onClick={this.handleSubmit}
                        to={{ pathname: '/chat', state: {korisnik: this.state.nickname}}}>
                        <i className="far fa-comment-alt header-profile-image--icon2"></i></Link> : null}

                    {this.state.hasProfile ?<Link
                        // onClick={this.handleSubmit}
                        to={{ pathname: '/mails'}}>
                        <i className="fas fa-envelope header-profile-image--icon2" style={{marginBottom: '.5rem'}}></i></Link> : null}

                    {this.state.hasProfile ? <div className="dropdown" style={{float: 'right', marginLeft: 'auto'}}>
                        <i className="fas fa-users header-profile-image--icon"></i>
                        <button className="dropbtn">Korisnici<div className="arrow"></div></button>
                        <div className="dropdown-content">
                            <Link className="user-nav--link" to="/friends-list">Prijatelji</Link>
                            <Link className="user-nav--link" to="/profiles">Svi korisnici</Link>
                            <Link className="user-nav--link" to="/friend-requests">Zahtevi za prijateljstvo</Link>

                        </div>
                    </div> : null}


                    <div className="dropdown">
                        <img className="header-profile-image" src={isAuthenticated ? require(`../../images/${user.avatar}`) : null} alt=""/>
                        <button className="dropbtn">{user.firstname} {user.lastname} <div className="arrow"></div></button>
                        <div className="dropdown-content">
                            {/*<Link className="user-nav--link" to={`/`}>Profil</Link>*/}
                            <Link className="user-nav--link" to='/dashboard'>Uredjivanje</Link>
                            <a onClick={this.onLogoutClick.bind(this)} className="user-nav--link" href="">Logout</a>
                        </div>
                    </div>

                    <Link
                        // onClick={this.handleSubmit}
                        to={{ pathname: '/'}}>
                        <i className="fas fa-bars header-profile-image--icon2 hamburger-navigation"></i></Link>


                </div>
        );

        const guestLinks = (
            <div className="header">

                <div className="user-nav--logo slideInLeft"><img className="disenat-logo" src={require('../../images/splogo2.png')} alt=""/></div>

                <div className="user-nav user-nav__left slideInLeft">
                    <Link className="user-nav--link" to="/">Početna</Link>
                    <Link to='/kompanije' className="user-nav--link">Kompanije</Link>
                    {/*<Link className="user-nav--link" to="/onama">O nama</Link>*/}
                    {/*<a className="user-nav--link" href="/">Di Club</a>*/}
                    <Link to='/vip-card' className="user-nav--link" href="/">Vip Card</Link>
                    {/*<a className="user-nav--link" href="/">Partneri</a>*/}
                    {/*<a className="user-nav--link" href="/">Kontakt</a>*/}
                    <a onClick={this.openModal} className="user-nav--link">Registracija</a>
                </div>


                <LoginPage/>
            </div>
        );


        return (
            <div>

                {isAuthenticated ? authLinks : guestLinks}

                {/*LOGIN*/}
                {/*<LoginPage/>*/}

                {/*REGISTRATION*/}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    className="Modal slideInLeft"
                    overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >

                    <RegistrationPage closeModal={this.closeModal} openThanksModal={this.openThanksModal} closeThanksModal={this.closeThanksModal}/>
                </Modal>
                {/*Thanks for registering*/}
                <Modal
                    isOpen={this.state.thanksModalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeThanksModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <ThanksForRegistering />
                </Modal>

            </div>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    hasProfile: state.hasProfile
});

export default connect(mapStateToProps, {getCurrentProfile,logoutUser, clearCurrentProfile})(Header);