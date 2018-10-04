import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import CompanyItem from './CompanyItem';
import {getProfiles} from "../../actions/profileActions";

class Companies extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        let companyItems;

        if(profiles === null || loading){
            companyItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                companyItems = profiles.map(profile => (

                    <CompanyItem key={profile._id} profile={profile}/>
                ));
            }else {
                companyItems = <h4 className="loading-animation">Nema kompanija</h4>
            }
        }

        return (
            <div className="berza-wrapper">
                <h1 className="berza-header">Kompanije</h1>
                <div>
                    {companyItems}
                </div>
            </div>
        );
    }
}

Companies.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Companies);