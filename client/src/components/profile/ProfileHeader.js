import React, { Component } from 'react';
import isEmpty from "../../validation/is-empty";

let profileImage;
class ProfileHeader extends Component {
    render() {

        const {profile} = this.props;

        let substring = 'gravatar'
        if (profile.user.avatar.includes(substring)) {
            profileImage = profile.user.avatar;
            // console.log(profileImage);
        } else {
            profileImage = require(`../../images/${profile.user.avatar}`);
            // console.log(profileImage);
        }

        return (
            <div className="profile-list" style={{border: 'none'}}>

                <img src={profileImage} alt="" className="profile-wrapper__image"/>

                <div>
                <h1 className="profile-list__username">{profile.user.firstname} {profile.user.lastname}</h1>

                <p className="profile-list__data">{profile.status} {isEmpty(profile.company) ? null : (`u ${profile.company}`)}</p>

                    <p className="profile-list__data">
                        {isEmpty(profile.country) ? null : `Drzava: ${profile.country}`} {isEmpty(profile.city) ? null : `, Grad: ${profile.city}`}
                    </p>

                    <p className="profile-list__data">
                        {isEmpty(profile.user.email) ? null : `Email: ${profile.user.email}`}
                    </p>

                    <p className="profile-list__data">
                        {isEmpty(profile.phone) ? null : `Telefon: ${profile.phone}`}
                    </p>

                </div>

                <div className="social-wrapper">
                    {isEmpty(profile.website) ? null :(<p>
                        <a className="social-net-links" href={profile.website} target="_blank">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    </p>)}


                        {isEmpty(profile.social && profile.social.twitter) ? null :(<p>
                            <a className="social-net-links" href={profile.social.twitter} target="_blank">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        </p>)}

                    {isEmpty(profile.social && profile.social.facebook) ? null :(<p>
                        <a className="social-net-links" href={profile.social.facebook} target="_blank">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    </p>)}

                    {isEmpty(profile.social && profile.social.linkedin) ? null :(<p>
                        <a className="social-net-links" href={profile.social.linkedin} target="_blank">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    </p>)}

                    {isEmpty(profile.social && profile.social.youtube) ? null :(<p>
                        <a className="social-net-links" href={profile.social.youtube} target="_blank">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    </p>)}

                    {isEmpty(profile.social && profile.social.instagram) ? null :(<p>
                        <a className="social-net-links" href={profile.social.instagram} target="_blank">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    </p>)}

                </div>

            </div>
        );
    }
}

export default ProfileHeader;