import React, {Component} from 'react';
import EmailHeader from "./components/EmailHeader";
import EmailSidebarItem from "./components/EmailSidebarItem";
import EmailList from "./components/EmailList";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import {getCurrentProfile, getProfiles} from "../../actions/profileActions";
import {getAllFriendRequests} from "../../actions/friendActions";
import FriendItem from "../friends/friendList/FriendItem";
import {getAllEmails, sendMessage, addReply} from "../../actions/emailActions";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import EmailItem from "./components/EmailItem";
import AllEmailsList from "./components/AllEmailsList";

class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            text: '',
            naslov: '',
            currentlySelectedUser: 'all',
            mailOpened: false,
            selectedMail: '',
            selectedName: ''
        }
        this.selectUser = this.selectUser.bind(this);
        this.onQuillChange = this.onQuillChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReply = this.onReply.bind(this);
        this.selectEmail = this.selectEmail.bind(this)
    }

    componentDidMount(){
        this.props.getAllFriendRequests();
        this.props.getProfiles();
        this.props.getCurrentProfile();
        this.props.getAllEmails();
    }

    selectEmail = (e) => {
        this.setState({selectedMail: e, mailOpened: true, currentlySelectedUser: 'all'})
        console.log('Mail opened ' + this.state.selectedMail)

    }

    selectUser = (e, selectedName) => {
        this.setState({currentlySelectedUser:e, mailOpened: false, selectedName:selectedName}, () => console.log(this.state.currentlySelectedUser))
        console.log(selectedName)

    }

    onQuillChange(e){
        this.setState({text: e})
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    updateReplies(){
        this.forceUpdate()
    }

    onReply(e){
        console.log('replied');
        e.preventDefault(e);
        const { user } = this.props.auth;
        const {profile} =  this.props.profile;
        let replymessage;
        let openedMail = this.state.selectedMail;
        let replysender = user.id;
        let avatar = user.avatar;
        let handle = profile.handle;
        let username = user.firstname + ' ' + user.lastname;

        if(this.state.text !== ''){
            replymessage = this.state.text;
        }
        console.log(handle)
        console.log('On reply id: ' + openedMail);
        let newReply = {
            replysender: replysender,
            replymessage: replymessage,
            avatar: avatar,
            handle: handle,
            username: username
        }
        if (replymessage !== '') {
            this.props.addReply(openedMail, newReply);
        } else {
            console.log('Text required')
        }
        this.setState({mailOpened: false})
        this.props.getAllEmails();
    }

    onSubmit(e){
        e.preventDefault(e);
        let mailsender;
        let mailrecipient;
        let mailmessage;
        let mailheading;
        let username, handle, avatar;
        const { user } = this.props.auth;
        const {profile} =  this.props.profile;
        if(user)
            mailsender = user.id;
            handle = profile.handle
            username = user.firstname + ' ' + user.lastname + ' > ' + this.state.selectedName;
            avatar = user.avatar
        console.log(user.id)
        if(this.state.currentlySelectedUser !== 'all')
            mailrecipient = this.state.currentlySelectedUser;
        if(this.state.text !== ''){
            mailmessage = this.state.text;
            console.log(mailmessage)
        }
        if(this.state.naslov !== ''){
            mailheading = this.state.naslov;
            console.log(mailheading)
        }


            let newMessage = {
                mailsender: mailsender,
                mailrecipient: mailrecipient,
                mailtitle: mailheading,
                mailmessage: mailmessage,
                username: username,
                handle: handle,
                avatar: avatar
            }

            this.props.sendMessage(newMessage);
            this.setState({text: ''});
            this.setState({naslov: ''});
            this.props.getAllEmails();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        const {friends} = this.props.friends;
        const { user } = this.props.auth;
        const {emails} = this.props.emails;



        let friendList;
        let emailList;
        let newMail;

        // EMAIL LIST
        if(emails.length > 0)
            emailList = emails.map(mail => {

                if(mail)
                newMail = mail.mailsender;
                // console.log(newMail)
                if(this.state.mailOpened === false){
                    if(this.state.currentlySelectedUser !== 'all') {
                        return <EmailList
                            selectEmail={this.selectEmail}
                            mailId={mail._id}
                            user={user.id}
                            currentlySelectedUser={this.state.currentlySelectedUser}
                            emailSender={mail.mailsender}
                            emailRecipient={mail.mailrecipient}
                            username={mail.username}
                            avatar={mail.avatar}
                            handle={mail.handle}
                            emailTitle={mail.mailtitle}
                            emailMessage={mail.mailmessage}
                            replies={mail.replies}
                        />
                    }else {
                        return <AllEmailsList
                            selectEmail={this.selectEmail}
                            mailId={mail._id}
                            user={user.id}
                            currentlySelectedUser={this.state.currentlySelectedUser}
                            emailSender={mail.mailsender}
                            emailRecipient={mail.mailrecipient}
                            emailTitle={mail.mailtitle}
                            username={mail.username}
                            avatar={mail.avatar}
                            handle={mail.handle}
                            emailMessage={mail.mailmessage}
                            replies={mail.replies}
                        />
                    }
                    } else {
                    return <EmailItem
                        key={mail._id}
                        mailId={mail._id}
                        emailTitle={mail.mailtitle}
                        emailMessage={mail.mailmessage}
                        username={mail.username}
                        avatar={mail.avatar}
                        handle={mail.handle}
                        replies={mail.replies}
                        selectedMail={this.state.selectedMail}/>
                }
            })




        // FRIENDS LIST
        if(friends.length > 0) {
            friendList = friends.map(friend => {

                let recipient = friend.recipient;
                let requester = friend.requester;
                let status = friend.status;

                console.log('requester: ' + requester + ' recipient: ' + recipient);

                if((requester.includes(user.id) || recipient.includes(user.id)) && status === 'friends'){
                    console.log('moj id: ' + user.id)
                    let myFriend;
                    let currentProfile;
                    if(!requester.includes(user.id))
                        myFriend = requester
                    if(!recipient.includes(user.id))
                        myFriend = recipient
                    if(myFriend)
                        if(profiles === null || loading){
                            return <h4 className="loading-animation">Ucitavam...</h4>
                        } else {
                            for(let i = 0; i < profiles.length; i++){
                                let a;
                                a = profiles[i];
                                if(a.user._id === myFriend){
                                    return (<EmailSidebarItem user={user.id} selectUser={this.selectUser} profile={profiles[i]} friendId={myFriend}/>)
                                }
                            }
                        }
                }
            })
        }

        return (

            <div className="email-container">

                <EmailHeader/>
                <div className="email-sidebar">
                    {friendList}
                </div>

                <div className="email-content-container">
                    <div className="scrollbar-mails">


                        {emailList}

                    </div>

                    {this.state.mailOpened === false && this.state.currentlySelectedUser !== 'all' ?
                    <form onSubmit={this.onSubmit} className="enter-post">

                        <input type="text"
                               className="email-input"
                               onChange={this.onChange}
                               name="naslov"
                               value={this.state.naslov}
                               placeholder="Naslov"/>


                        <ReactQuill
                            style={{ marginTop: '2rem', color: '#000', borderBottom: '0px'}}
                            modules={Email.modules}
                            formats={Email.formats}
                            placeholder="Tekst poruke"
                            name="text"
                            value={this.state.text}
                            onChange={this.onQuillChange}
                        />
                        <button className="contact-button--1 compose-mail-button" type="submit" style={{marginTop: '2rem'}}>Potvrdi</button>


                    </form>
                            :

                       null
                    }

                    {this.state.mailOpened ?

                        <form onSubmit={this.onReply} className="enter-post">

                            <ReactQuill
                                style={{ marginTop: '2rem', color: '#000', borderBottom: '0px'}}
                                modules={Email.modules}
                                formats={Email.formats}
                                placeholder="Tekst odgovora"
                                name="text"
                                value={this.state.text}
                                onChange={this.onQuillChange}
                            />
                            <button className="contact-button--1 compose-mail-button" type="submit" style={{marginTop: '2rem'}}>Posalji odgovor</button>


                        </form> : null}

                </div>
            </div>
        );
    }
}


Email.modules = {
    toolbar: [
        ['link', 'image', 'video']
    ]
};

Email.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];



Email.propTypes = {
    addReply: PropTypes.func.isRequired,
    sendMessage:PropTypes.func.isRequired,
    getAllEmails: PropTypes.func.isRequired,
    getAllFriendRequests: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    friends: state.friend,
    profile: state.profile,
    auth: state.auth,
    emails: state.email
});

export default connect(mapStateToProps, {getCurrentProfile, getAllFriendRequests, getProfiles, getAllEmails, sendMessage, addReply})(Email);