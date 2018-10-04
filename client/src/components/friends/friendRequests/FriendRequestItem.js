import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';

let profileImage;
class FriendRequestItem extends Component {


    render(){

        const {profile} = this.props;
        let substring = 'gravatar'
        if (profile.user.avatar.includes(substring)) {
            profileImage = profile.user.avatar;
            console.log(profileImage);
        } else {
            profileImage = require(`../../../images/${profile.user.avatar}`);
            console.log(profileImage);
        }


        return(
            <div className="table-dashboard__businessplan">
                <div className="profile-list">
                    <Link to={`/profile/${profile.handle}`}>
                        <img src={profileImage} alt="" className="profile-wrapper__image"/>
                    </Link>

                    <div>
                        <Link to={`/profile/${profile.handle}`} className="profile-list__username">{profile.user.firstname} {profile.user.lastname}</Link>

                        <p className="profile-list__data">
                            {profile.status} {isEmpty(profile.company) ? null : (`u ${profile.company}`)}
                        </p>

                        <p className="profile-list__data">
                            {isEmpty(profile.country) ? null : `Drzava: ${profile.country}`} {isEmpty(profile.city) ? null : `, Grad: ${profile.city}`}
                        </p>

                        <div>

                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

FriendRequestItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default FriendRequestItem;