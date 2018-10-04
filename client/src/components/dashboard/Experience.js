import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {

    onDeleteClick(id){
        this.props.deleteExperience(id);
    }


    render(){

        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td className="table-dashboard__item">{exp.company}</td>
                <td className="table-dashboard__item">{exp.title}</td>

                <td className="table-dashboard__item">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (' Danas') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                    </td>

                <td className="table-dashboard__item">{exp.description}</td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="table-dashboard__button">Obrisi</button></td>
            </tr>
        ))

        return(
            <div>
                <p className="experience-title">Radno iskustvo</p>
                <table className="table-dashboard">
                    <thead>
                        <tr>
                            <th className="table-dashboard__item">Kompanija</th>
                            <th className="table-dashboard__item">Naziv</th>
                            <th className="table-dashboard__item">Period</th>
                            <th className="table-dashboard__item">Opis</th>
                            <th></th>
                        </tr>
                    <tbody>
                    {experience}
                    </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);