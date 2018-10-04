import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';

import {getAllFriendRequests} from "../../../actions/friendActions";
import {getCurrentProfile, getProfiles} from "../../../actions/profileActions";
import FriendItem from "./FriendItem";

class Friends extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.props.getAllFriendRequests();
        this.props.getProfiles();
        this.props.getCurrentProfile();
    }

    render() {
        const {profiles, loading} =  this.props.profile;
        const {friends} = this.props.friends;
        const { user } = this.props.auth;
        let friendList;

        if(friends.length > 0) {
            friendList = friends.map(friend => {

                let recipient = friend.recipient;
                let requester = friend.requester;
                let status = friend.status;

                if((requester.includes(user.id) || recipient.includes(user.id)) && status === 'friends'){
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
                                    return (<FriendItem profile={profiles[i]} friendId={myFriend}/>)
                                }
                            }
                            console.log(profiles)


                        }
                }
            })
        }

        return (
            <div>
                <h1>Prijatelji</h1>
                <div>{friendList}</div>
            </div>
        );
    }
}

Friends.propTypes = {
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

export default connect(mapStateToProps, {getCurrentProfile, getAllFriendRequests, getProfiles})(Friends);