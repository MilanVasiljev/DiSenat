import React, { Component } from 'react';
import Vesti from "./Vesti";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profileActions";

class ArticleNews extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        let articleItem;

        let matchId = this.props.match.params.vestiId;

        if(profiles === null || loading){
            articleItem = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                articleItem = profiles.map(profile => (



                    <Vesti key={profile._id} profile={profile} matchId={matchId}/>
                ));
            }else {
                articleItem = <h4 className="loading-animation">Nema artikala</h4>
            }
        }

        return (
            <div>
                {articleItem}
            </div>

        );
    }
}

ArticleNews.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(ArticleNews);