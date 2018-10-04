import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteArticle} from '../../actions/profileActions';

class Article extends Component {

    onDeleteClick(id){
        this.props.deleteArticle(id);
    }

    addDefaultSrc(ev){
        ev.target.src = 'some default image url'
    }


    render(){


        const article = this.props.article.map(art => (
            <div className="bp-style" style={{border: '1px solid black', margin: '1rem 2rem', textAlign: 'center'}} key={art._id}>
                <p className="table-dashboard__item table-dashboard__item--bp bp-title">{art.title}</p>
                <img className="bp-style__image"  src={art.image} alt=""/>

                <p className="table-dashboard__item table-dashboard__item--bp">{art.articletext}</p>
                <p className="table-dashboard__item table-dashboard__item--bp">Kategorija: {art.category}</p>
                <td><button onClick={this.onDeleteClick.bind(this, art._id)} className="table-dashboard__button">Obrisi</button></td>
            </div>
        ))

        return(
            <div>
                <p className="experience-title">Moji artikli</p>
                {article}
            </div>
        )
    }
}

Article.propTypes = {
    deleteArticle: PropTypes.func.isRequired
}

export default connect(null, {deleteArticle})(Article);