import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {getProfiles} from "../../../actions/profileActions";
import AboutNewsItem from '../about/AboutNewsItem';
import AboutUsItem from "../about/AboutUsItem";
import Partneri from "../about/Partneri";
import Footer from "../../footer/Footer";


class Landing extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }

    render() {

        const {profiles, loading} =  this.props.profile;
        let articleItems, aboutUsItems, partneriItems;


        if(profiles === null || loading){
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

        if(profiles === null || loading){
            partneriItems = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            if (profiles.length > 0){
                partneriItems = profiles.map(profile => (

                    <Partneri key={profile._id} profile={profile}/>
                ));
            }else {
                partneriItems = <h4 className="loading-animation">Nema partnera</h4>
            }
        }


        return (
            <div className="landing">

                <div className="border-carousel">

               <Carousel style={{background: '#fff'}}/>

                </div>
                <div className="o-nama-wrapper">
                    <div className="seenon-text">O NAMA</div>
                    {aboutUsItems}

                    <div className="seenon-text" style={{gridColumn: '1/2', marginTop: '1.5rem'}}>NOVOSTI</div>
                    <div className="articles-wrapper">

                        <div className="article-item">

                            {articleItems}
                        </div>

                        <div className="sidebar">
                            <p className="partneri-text">Naši partneri</p>
                            <div className="partneri-wrapper">
                            {partneriItems}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<Footer/>*/}
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Landing);