import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';


class AboutNewsItem extends Component {
    render(){

        const {profile} = this.props;
        let articles, smallArticles, firstArticleId;


        for(let i = 0; i < profile.article.length; i++) {
            if(profile.article[i].category === 'Vesti'){

                let Background = profile.article[i].image;

                articles = (


                        <div class="movie-card"
                             style={{
                                 backgroundImage: `url(${ Background })`,
                                 backgroundSize: 'contain',
                                 backgroundRepeat: 'no-repeat',

                                 display: 'block',
                                 margin: '2rem auto',
                                 borderRadius: '8px',
                                 boxShadow: '0px 8px 12px 0px rgba(0,0,0,0.25)'

                             }}>
                            <div class="color-overlay">

                                <div class="movie-content first-article-wrapper">
                                    <div class="movie-header">
                                        <h1 class="movie-title typography">{profile.article[i].title}</h1>
                                        {/*<h4 class="movie-info typography">(1982) Sci-Fi, Thriller</h4>*/}
                                    </div>
                                    <p class="movie-desc">
                                        <Truncate lines={2} ellipsis={<span>...</span>}>
                                            {renderHTML(profile.article[i].articletext)}
                                        </Truncate>
                                        </p>
                                    <Link to={`/vesti/${profile.article[i]._id}`} class="btn btn-outline">Pročitaj članak</Link>

                                </div>
                            </div>
                        </div>

                )
                firstArticleId = profile.article[i]._id;
                break;
            }
        }

        smallArticles = profile.article.map(res =>(
            res.category === 'Vesti' && res._id !== firstArticleId ?
            <div key={res._id} className="article-item-small article-item-small--1">
                {res.category === 'Vesti' ?
                    <Link to={`/vesti/${res._id}`}>
                <img className="article-item-small__image"  src={res.image} alt=""/>
                    </Link>
                : null}
                {res.category === 'Vesti' ?
                <div className="text-block-small">
                    <Link
                        to={`/vesti/${res._id}`} className="headline-article-small">{res.title}</Link>
                    <p className="paragraph-article-small">
                        <Truncate lines={1} ellipsis={<span>...</span>}>
                        {renderHTML(res.articletext)}
                        </Truncate>
                        </p>
                </div>
                : null}
            </div> : null
        ))

        return(
            <div>

                {articles}

                <div className="articles-items-grid">
                {smallArticles}

                </div>
            </div>
        )
    }
}

AboutNewsItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default AboutNewsItem;