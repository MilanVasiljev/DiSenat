import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';

class CompanyItem extends Component {
    render() {

        const {profile} = this.props;
        let company;

        company = profile.ownercompany.map(res =>(
            <Link to={`/kompanija-item/${res._id}`} key={res._id} className="article-item-small busplan-item">
                <div>
                    <Link to={`/kompanija-item/${res._id}`}>
                        {res.imageurl === null ? null : <img className="article-item-small__image--1"  src={res.imageurl} alt=""/>}
                    </Link>
                </div>
                <div className="text-block-small text-block-small--1">
                    <Link
                        to={`/kompanija-item/${res._id}`} className="headline-article-small bustext-wrapper">{res.name}</Link>

                    <p className="paragraph-article-small bustext-wrapper">
                        {res.fieldofwork}
                    </p>

                    <p className="paragraph-article-small bustext-wrapper">
                        {res.city}, {res.country}
                    </p>


                    <p className="paragraph-article-small bustext-wrapper">
                        <Truncate lines={2} ellipsis={<span>...</span>}>
                            {renderHTML(res.shortworkdescription)}
                        </Truncate>
                    </p>
                </div>

                {/*<button className="contact-button bplan-button">Zainteresovan sam za saradnju</button>*/}

            </Link>
        ))

        return (
            <div className="articles-wrapper articles-wrapper__businessplan">
                {company}
            </div>
        );
    }
}

CompanyItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default CompanyItem;