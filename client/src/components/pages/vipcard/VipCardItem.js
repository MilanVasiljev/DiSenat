import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';

class VipCardItem extends Component {
    render() {

        const {profile} = this.props;
        let vipCard;

        vipCard = profile.article.map(res =>
                (
             res.category === 'Vip Card' ?
            <div className="read-article-wrapper">
                {console.log(res)}

                <div className="card-news">
                    <div className="thumbnail"><img className="left" src={res.image}/></div>
                    <div className="right">
                        <h1 className="news-header-1">{res.title}</h1>
                        <div className="separator"></div>

                    </div>
                    <p className="news-paragraph">
                        {renderHTML(res.articletext)}
                    </p>
                    <button className="contact-button bus-button"
                            style={{alignSelf: 'center', marginBottom: `3rem`, marginLeft: '3rem'}}>Narucite karticu
                    </button>
                    <Link to="/" class="circlefab"><i className="fa fa-arrow-left fa-3x"> </i></Link>
                </div>

            </div> : null

        )
        )

        return (
            <div className="articles-wrapper articles-wrapper__businessplan">
                {vipCard}
            </div>
        );
    }
}

VipCardItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default VipCardItem;