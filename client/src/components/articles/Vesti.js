import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';

class Vesti extends Component {
    render(){

        const {profile} = this.props;
        const {matchId} = this.props;
        let articles, smallArticles, firstArticleId;




        for(let i = 0; i < profile.article.length; i++) {
            if(profile.article[i]._id === matchId){
                articles = (
                    <div className="read-article-wrapper">

                        <div class="card-news">
                            <div class="thumbnail"><img class="left" src={profile.article[i].image}/></div>
                            <div class="right">
                                <h1 className="news-header-1">{profile.article[i].title}</h1>
                                <div class="separator"></div>

                            </div>
                            <p className="news-paragraph">
                                {renderHTML(profile.article[i].articletext)}
                            </p>
                            <Link to="/" class="circlefab"><i class="fa fa-arrow-left fa-3x"> </i></Link>
                        </div>

                    </div>
                )
                firstArticleId = profile.article[i]._id;
                break;
            }
        }

        return(
            <div style={{marginBottom: '4rem'}}>

                    {articles}

            </div>
        )
    }
}

Vesti.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Vesti;