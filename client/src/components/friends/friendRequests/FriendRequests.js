import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from "../../../actions/profileActions";
import FriendRequestItem from './FriendRequestItem';
import {getAllFriendRequests, acceptfriend} from "../../../actions/friendActions";
import {getCurrentProfile} from "../../../actions/profileActions";
import axios from "axios";


let alreadyFriendsArray = [];
class FriendRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            errors: {}
        };
        this.acceptNewFriend = this.acceptNewFriend.bind(this);
        this.findId = this.findId.bind(this);
        this.findIfFriends = this.findIfFriends.bind(this);
    }

    componentDidMount(){
        this.props.getAllFriendRequests();
        this.props.getProfiles();
        this.props.getCurrentProfile();
    }

    componentDidUpdate(){
        this.findIfFriends();
    }

    acceptNewFriend = (friendId) => {
        axios.post('api/friends/acceptfriend', {id:friendId})
            .then(res => {
                console.log(res.data);

                window.location.reload();
            })
    }

    findId = (id) => {
        const {friends} = this.props.friends;
        const { user } = this.props.auth;

         friends.map((item) => {
            let requester = item.requester;
            let recipient = item.recipient;
            let friendId = item._id;

            if (user.id === recipient && id.user._id === requester){
                this.acceptNewFriend(friendId)
            }
        })
    }

    findIfFriends = () => {
        const {profiles, loading} =  this.props.profile;
        const {friends} = this.props.friends;
        const { user } = this.props.auth;

        for(let i = 0; i< friends.length; i++) {
            if (friends[i].status === "friends" && friends[i].recipient === user.id) {
                if(!alreadyFriendsArray.includes(friends[i].requester))
                alreadyFriendsArray.push(friends[i].requester);
            }}
    }

    render(){
        const {profiles, loading} =  this.props.profile;
        let profileItems;
        let arrayOfRequests = [
                {requester: ''},
                {friendId: ''}
        ];

        const {friends} = this.props.friends;
        const { user } = this.props.auth;

        if(friends.length > 0){
            friends.map((item) => {
                let requester = item.requester;
                let recipient = item.recipient;
                let friendId = item._id;
                let status = item.status;

                if (user.id === recipient){
                    arrayOfRequests.push([{requester: requester}, {friendId: friendId}, {status: status}])
                }
            })
        }


        if(profiles === null || loading){
            profileItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                let fullRequest = [];
                arrayOfRequests.map(item =>{
                    let a, b, c;
                    let whoRequested = JSON.stringify(item[0]);
                    let requestId = JSON.stringify(item[1]);
                    let status = JSON.stringify(item[2]);
                    if(whoRequested !== undefined) {
                        a = whoRequested.slice(14,38);
                        b = requestId.slice(13, 37);
                        c = status.slice(11);
                        fullRequest.push({r:a,id: b, s:c})
                    }
                })



                    profileItems = profiles.map((profile) => {
                            if(fullRequest)
                            return fullRequest.map(item => item.r).includes(profile.user._id)
                                && !alreadyFriendsArray.includes(profile.user._id) ?
                                <div>
                                    <FriendRequestItem key={profile._id} profile={profile}/>
                                    <button
                                        onClick={() => this.findId(profile)}
                                        className="contact-button--login"
                                        style={{padding: '1rem', marginLeft: '4rem'}}>Prihvati prijateljstvo
                                    </button>
                                </div> : null })

                } else
                    {profileItems = <h4 className="loading-animation">Nije pronadjen profil</h4>}
                }




        return(
            <div className="profili-korisnika-wrapper">
                <div>
                    <h1 style={{paddingLeft: '1rem'}}>Zahtevi za prijateljstvo</h1>
                    <p style={{paddingLeft: '1rem'}}>Povezite se sa ljudima</p>
                    {profileItems}
                </div>
            </div>
        )
    }
}

FriendRequests.propTypes = {
    acceptfriend: PropTypes.func.isRequired,
    getAllFriendRequests: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    friends: state.friend,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, getAllFriendRequests, getProfiles, acceptfriend})(FriendRequests);