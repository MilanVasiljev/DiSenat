import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';

class Partneri extends Component {

    constructor() {
        super()

        this.state = {
            flipped: false,
        }
    }

    render(){

        const {profile} = this.props;
        let smallArticles;

        smallArticles = profile.article.map(res => (
            res.category === 'Partneri' ?
                <div key={res._id} className="">
                        {/*<img className="article-item-small-partneri__image" src={res.image} alt=""/>*/}

                    <div className="flip article-item-small-partneri__image">
                        <div className="front"
                             style={{
                                 backgroundImage: `url(${res.image})`
                             }}>
                            <h1 className="text-shadow">{res.title}</h1>
                        </div>
                        <div className="back">
                            <h2>{res.title}</h2>
                            <p>{res.articletext}</p>
                        </div>
                    </div>

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

Partneri.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Partneri;