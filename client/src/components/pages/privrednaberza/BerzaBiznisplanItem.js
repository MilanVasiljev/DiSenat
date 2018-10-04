import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';

class BerzaBiznisplanItem extends Component {
    render() {

        const {profile} = this.props;
        let businessPlans;

        businessPlans = profile.businessplan.map(res =>(
                <Link to={`/biznis-plan/${res._id}`} key={res._id} className="article-item-small busplan-item">
                    <div>
                        <Link to={`/biznis-plan/${res._id}`}>
                            {res.imageurl === null ? null : <img className="article-item-small__image--1"  src={res.imageurl} alt=""/>}
                        </Link>
                    </div>
                        <div className="text-block-small text-block-small--1">
                            <Link
                                to={`/biznis-plan/${res._id}`} className="headline-article-small bustext-wrapper">{res.title}</Link>
                            <p className="paragraph-article-small bustext-wrapper">
                                <Truncate lines={2} ellipsis={<span>...</span>}>
                                    {renderHTML(res.description)}
                                </Truncate>
                            </p>
                        </div>

                        {/*<button className="contact-button bplan-button">Zainteresovan sam za saradnju</button>*/}

                </Link>
        ))

        return (
            <div className="articles-wrapper articles-wrapper__businessplan">
                {businessPlans}
            </div>
        );
    }
}

BerzaBiznisplanItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default BerzaBiznisplanItem;