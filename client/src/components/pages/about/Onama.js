import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../../../actions/profileActions';
import AboutNewsItem from '../about/AboutNewsItem';
import AboutUsItem from "./AboutUsItem";


class Onama extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }


    render() {

        const {profiles, loading} =  this.props.profile;
        let articleItems, aboutUsItems;

        if(loading){
            articleItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                articleItems = profiles.map(profile => (

                    <AboutNewsItem key={profile._id} profile={profile}/>
                ));
            }else {
                articleItems = <h4 className="loading-animation">Nema artikala</h4>
            }
        }

        if(profiles === null || loading){
            aboutUsItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                aboutUsItems = profiles.map(profile => (

                    <AboutUsItem key={profile._id} profile={profile}/>
                ));
            }else {
                aboutUsItems = <h4 className="loading-animation">Nema artikala</h4>
            }
        }



        return (
            <div className="o-nama-wrapper">
                <div className="seenon-text">O nama</div>
                <div className="linear-gradient-wrapper">
                {aboutUsItems}
                </div>
                <div className="seenon-text">Novosti</div>
                <div className="articles-wrapper">
                    <div className="articles-wrapper">
                        {articleItems}
                    </div>
                <div className="sidebar">Sidebar</div>
                </div>
            </div>
        );
    }
}

Onama.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Onama);