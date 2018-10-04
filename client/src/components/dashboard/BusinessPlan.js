import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteBusinessPlan} from '../../actions/profileActions';
import renderHtml from 'react-render-html';

class BusinessPlan extends Component {

    onDeleteClick(id){
        this.props.deleteBusinessPlan(id);
    }

    addDefaultSrc(ev){
        ev.target.src = 'some default image url'
    }


    render(){

        const businessplan = this.props.businessplan.map(bp => (
            <div className="bp-style" style={{border: '1px solid black', margin: '1rem 2rem', textAlign: 'center'}} key={bp._id}>
                <p className="table-dashboard__item table-dashboard__item--bp bp-title">{bp.title}</p>
                <img className="bp-style__image"  src={bp.imageurl} alt=""/>

                <p className="table-dashboard__item table-dashboard__item--bp">{renderHtml(bp.description)}</p>
                <td><button onClick={this.onDeleteClick.bind(this, bp._id)} className="table-dashboard__button">Obrisi</button></td>
            </div>
        ))

        return(
            <div>
                    {/*<p className="experience-title">Moji biznis planovi</p>*/}
                    {businessplan}
            </div>
        )
    }
}

BusinessPlan.propTypes = {
    deleteBusinessPlan: PropTypes.func.isRequired
}

export default connect(null, {deleteBusinessPlan})(BusinessPlan);