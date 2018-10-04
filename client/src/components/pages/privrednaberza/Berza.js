import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import BerzaBiznisplanItem from './BerzaBiznisplanItem';
import {getProfiles} from "../../../actions/profileActions";

class Berza extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        let biznisPlanItems;

        if(profiles === null || loading){
            biznisPlanItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                biznisPlanItems = profiles.map(profile => (

                    <BerzaBiznisplanItem key={profile._id} profile={profile}/>
                ));
            }else {
                biznisPlanItems = <h4 className="loading-animation">Nema biznis planova</h4>
            }
        }

        return (
            <div className="berza-wrapper">
               <h1 className="berza-header">Privredna Berza</h1>
                <div>
                {biznisPlanItems}
                </div>
            </div>
        );
    }
}

Berza.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Berza);