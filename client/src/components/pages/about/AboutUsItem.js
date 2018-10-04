import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';

class AboutUsItem extends Component {

    render(){

        const {profile} = this.props;
        let smallArticles;

            // smallArticles = profile.article.map(res => (
            //     res.category === 'O nama' ?
            //     <div key={res._id} className="article-item-small">
            //         {res.category === 'O nama' ?
            //         <Link to={`/vesti/${res._id}`}>
            //         <img className="article-item-small__image" src={res.image} alt=""/>
            //         </Link>
            //             : null}
            //         {res.category === 'O nama' ?
            //         <div className="text-block-small">
            //             <Link to={`/vesti/${res._id}`} className="headline-article-small">{res.title}</Link>
            //             <p className="paragraph-article-small">
            //                 <Truncate lines={2} ellipsis={<span>...</span>}>
            //                     {res.articletext}
            //                 </Truncate>
            //             </p>
            //         </div>
            //             : null}
            //     </div> : null
            // ))


        smallArticles = profile.article.map(res => (
            res.category === 'O nama' ?
                <div key={res._id} class="card-container">
                    <div class="card u-clearfix">
                        <div class="card-body">
                            {/*<span class="card-number card-circle subtle">01</span>*/}
                            {/*<span class="card-author subtle">{res.user.profile.firstname} {res.user.profile.lastname}</span>*/}
                            <h2 class="card-title">{res.title}</h2>
                            <span class="card-description subtle">
                                <Truncate lines={1} ellipsis={<span>...</span>}>
                                       {renderHTML(res.articletext)}
                                </Truncate>
                            </span>
                            <Link to={`/vesti/${res._id}`}>
                            <div class="card-read">Više</div>
                            </Link>
                            {/*<span class="card-tag card-circle subtle">C</span>*/}
                        </div>
                        <img src={res.image} alt="" class="card-media" />
                    </div>
                    <div class="card-shadow"></div>
                </div> : null
        ))

        return(
            <div>
                <div className="articles-items-grid">

                    {smallArticles}
                </div>

            </div>
        )
    }
}

AboutUsItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default AboutUsItem;