import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import VipCardItem from './VipCardItem';
import {getProfiles} from "../../../actions/profileActions";

class VipCard extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        let vipCardItems;

        if(profiles === null || loading){
            vipCardItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                vipCardItems = profiles.map(profile => (

                    <VipCardItem key={profile._id} profile={profile}/>
                ));
            }else {
                vipCardItems = <h4 className="loading-animation">Nema biznis planova</h4>
            }
        }

        return (
            <div className="berza-wrapper">
                <h1 className="berza-header">Vip Card</h1>
                <div>
                    {vipCardItems}
                </div>
            </div>
        );
    }
}

VipCard.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(VipCard);