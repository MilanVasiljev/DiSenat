import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';

import {getAllFriendRequests} from "../../../actions/friendActions";
import {getCurrentProfile, getProfiles} from "../../../actions/profileActions";
import {Link} from "react-router-dom";
import isEmpty from "../../../validation/is-empty";

class EmailSidebarItem extends Component {

    constructor(props) {
        super(props);

        this.loadMailsFromFriend = this.loadMailsFromFriend.bind(this)
    }


    loadMailsFromFriend = (profile) => {
        // console.log(profile)
        let selectedName = profile.user.firstname + ' ' + profile.user.lastname;
        this.props.selectUser(profile.user._id, selectedName)

    }

    render() {

        console.log('Moj id ' + this.props.user)

        return (
            <div>

                <div
                    onClick={() => this.loadMailsFromFriend(this.props.profile)}
                    className="email-friends-wrapper">


                        <div>
                            <img src={require(`../../../images/${this.props.profile.user.avatar}`)} alt="" className="email-profile-image"/>
                        </div>

                        <div>
                            <div
                                className="email-friends-name">{this.props.profile.user.firstname} {this.props.profile.user.lastname}
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default EmailSidebarItem;