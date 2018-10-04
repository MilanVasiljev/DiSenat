import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import {getProfileByHandle} from '../../actions/profileActions';
import {requestfriend, getAllFriendRequests, acceptfriend} from "../../actions/friendActions";
import {getCurrentProfile} from "../../actions/profileActions";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            errors: {}
        };
        this.onFriendRequestSubmit = this.onFriendRequestSubmit.bind(this);

    }

    componentDidMount(){
        this.props.getAllFriendRequests();
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    // SEND FRIEND REQUEST
    onFriendRequestSubmit(e){
        e.preventDefault();

        let {profile} = this.props.profile;
        const { user } = this.props.auth;

        let requester = user.id;
        let recipient = profile.user._id;

        const friendRequestData = {
            requester: requester,
            recipient: recipient
        }

        console.log(friendRequestData)
        this.props.requestfriend(friendRequestData, this.props.history)
    }

    render() {

        const {profile, loading} = this.props.profile;
        let profileContent;

        let friendRequest;
        let buttonContent;
        const {friends} = this.props.friends;
        const { user } = this.props.auth;
        let buttonExists = true;

        if(profile === null){
            return <div>Loading</div>
        }

        if(profile !== null) {

            let requestType = 'no-request';
            let preventAsycn = 'a';


            console.log('Profil korisnika je: ' + profile.user._id)


            if (friends.length > 0) {
                for(let i = 0; i< friends.length; i++) {

                    console.log(friends)

                    if (user.id === friends[i].requester && profile.user._id === friends[i].recipient && friends[i].status === 'pending') {
                        requestType = 'already-sent'
                        console.log(requestType)
                        // preventAsycn = 'allowed';
                        continue;

                    } else if (user.id === friends[i].recipient && profile.user._id === friends[i].requester && friends[i].status ==='pending')  {
                        requestType='waiting-your-response'
                        console.log(requestType)
                        // preventAsycn = 'allowed';
                        continue;
                    } else if((user.id === friends[i].requester && profile.user._id === friends[i].recipient && friends[i].status === 'friends')
                        || (user.id === friends[i].recipient && profile.user._id === friends[i].requester && friends[i].status ==='friends'))
                        {
                            console.log('Ja: ' + user.id + ' On: ' + profile.user._id)
                        // preventAsycn = 'allowed'
                        requestType = 'friends'
                            continue;
                    }
                preventAsycn = 'allowed';
                }
                // console.log('button content= ' + requestType)
            }

            if(preventAsycn === 'allowed'){

                if(requestType === 'no-request'){
                    buttonContent = 'Posaljite zahtev'
                    console.log('kontent ' + buttonContent)
                    // buttonExists = true;
                }

                if(requestType === 'already-sent'){
                    buttonContent = 'Vas zahtev je prosledjen'
                    // buttonExists = true;
                }

                if(requestType === 'waiting-your-response'){
                    buttonContent = 'Prihvatite prijateljstvo'
                    // buttonExists = true;
                }
                if(requestType === 'friends'){
                    buttonExists = false;
                }
            }


        }



        if(profile === null || loading){
            profileContent = <div>Loading...</div>
        } else {
            profileContent = (
                <div>
                        {buttonExists ?
                    <div>
                        <button onClick={this.onFriendRequestSubmit}>{buttonContent}</button>
                    </div> : null}
                    {friendRequest}


                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>

                    <ProfileCreds education={profile.education} experience={profile.experience} businessplan={profile.businessplan} />

                </div>
            )
        }


        return (
            <div className="profile-content">

                <div>
                    {profileContent}
                </div>


            </div>
        );
    }
}

Profile.propTypes = {
    requestfriend: PropTypes.func.isRequired,
    getAllFriendRequests: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    friends: state.friend,
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {requestfriend, getAllFriendRequests, getProfileByHandle, getCurrentProfile})(Profile);