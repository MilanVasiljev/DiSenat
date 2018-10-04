import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

let profileImage;
class ProfileItem extends Component {


    render(){

        const {profile} = this.props;
        let substring = 'gravatar'
        if (profile.user.avatar.includes(substring)) {
            profileImage = profile.user.avatar;
            console.log(profileImage);
        } else {
            profileImage = require(`../../images/${profile.user.avatar}`);
            console.log(profileImage);
        }


        return(
            <Link to={`/profile/${profile.handle}`} className="table-dashboard__businessplan">
                <div className="profile-list">
                    <div>
                    <img src={profileImage} alt="" className="profile-wrapper__image"/>
                    </div>

                    <div>
                        <Link to={`/profile/${profile.handle}`} className="profile-list__username">{profile.user.firstname} {profile.user.lastname}</Link>

                        <p className="profile-list__data">
                        {profile.status} {isEmpty(profile.company) ? null : (`u ${profile.company}`)}
                        </p>

                        <p className="profile-list__data">
                            {isEmpty(profile.country) ? null : `Drzava: ${profile.country}`} {isEmpty(profile.city) ? null : `, Grad: ${profile.city}`}
                        </p>

                        {/*<Link to={`/profile/${profile.handle}`} className="contact-button contact-button__registration">Pogledajte profil</Link>*/}
                        <div>
                        {/*<div>*/}
                        {/*<p className="profile-list__data">Usluge i znanja: </p>*/}
                        {/*</div>*/}

                        {/*<ul>*/}
                            {/*{profile.skills.slice(0,4).map((skill, index) => (*/}
                                {/*<li key={index} className="profile-list__lista">*/}
                                    {/*- {skill}*/}
                                {/*</li>*/}
                            {/*))}*/}
                        {/*</ul>*/}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;