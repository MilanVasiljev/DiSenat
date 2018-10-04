import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render(){

        const {profiles, loading} =  this.props.profile;
        let profileItems;

        if(profiles === null || loading){
            profileItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                profileItems = profiles.map(profile => (
                   <ProfileItem key={profile._id} profile={profile}/>
                ));
            }else {
                profileItems = <h4 className="loading-animation">Nije pronadjen profil</h4>
            }
        }

        return(
            <div className="profili-korisnika-wrapper">
                <div>
                <h1 style={{paddingLeft: '1rem'}}>Profili korisnika</h1>
                <p style={{paddingLeft: '1rem'}}>Povezite se sa ljudima</p>
                {profileItems}
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);