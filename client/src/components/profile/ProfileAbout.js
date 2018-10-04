import React, { Component } from 'react';
import isEmpty from "../../validation/is-empty";
import PropTypes from 'prop-types';

class ProfileAbout extends Component {


    render() {
        const { profile } = this.props;

        // Skill list
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="skills-text">
                <i className="fa fa-check"/> {skill}
            </div>
        ));

        return (
            <div>
                <div>
               <h1 className="seenon-text">{profile.user.firstname} - Lični podaci</h1>

                    <p className="profile-header" style={{margin: '1rem'}}>{isEmpty(profile.bio) ? null : (<span><span className="bold-me">Biografija:</span> <span>{profile.bio}</span></span>)}</p>

                </div>

                <h3 className="profile-input" style={{margin: '1rem', fontWeight: '600'}}>Radne sposobnosti:</h3>

                <div className="skills-wrapper">
                    {skills}
                </div>

            </div>
        );
    }
}

export default ProfileAbout;