import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';


class Plan extends Component {
    render(){

        const {profile} = this.props;
        const {matchId} = this.props;
        let articles, smallArticles, firstArticleId;


        for(let i = 0; i < profile.businessplan.length; i++) {
            if(profile.businessplan[i]._id === matchId){
                articles = (

                    <div className="read-article-wrapper">

                        <div class="card-news">
                            <div class="thumbnail"><img class="left" src={profile.businessplan[i].imageurl}/></div>
                            <div class="right">
                                <h1 className="news-header-1">{profile.businessplan[i].title}</h1>
                                <div class="separator"></div>

                            </div>
                            <p className="news-paragraph">
                                {renderHTML(profile.businessplan[i].description)}
                            </p>
                            <button className="contact-button bus-button" style={{alignSelf: 'center', marginBottom: `3rem`, marginLeft: '3rem'}}>Zainteresovan sam za saradnju</button>
                            <Link to="/" class="circlefab"><i class="fa fa-arrow-left fa-3x"> </i></Link>
                        </div>

                    </div>
                )
                firstArticleId = profile.businessplan[i]._id;
                break;
            }
        }

        return(
            <div>
                <div>
                    {articles}
                </div>
            </div>
        )
    }
}

Plan.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Plan;