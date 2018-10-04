import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick(id){
        this.props.deleteEducation(id);
    }


    render(){

        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td className="table-dashboard__item">{edu.school}</td>
                <td className="table-dashboard__item">{edu.degree}</td>

                <td className="table-dashboard__item">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (' Danas') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>

                <td className="table-dashboard__item">{edu.fieldofstudy}</td>
                <td><button onClick={this.onDeleteClick.bind(this, edu._id)} className="table-dashboard__button">Obrisi</button></td>
            </tr>
        ))

        return(
            <div>
                <p className="experience-title">Škole i kursevi</p>
                <table className="table-dashboard">
                    <thead>
                    <tr>
                        <th className="table-dashboard__item">Ime škole</th>
                        <th className="table-dashboard__item">Stepen obrazovanja</th>
                        <th className="table-dashboard__item">Period školovanja</th>
                        <th className="table-dashboard__item">Polje školovanja (smer)</th>
                        <th></th>
                    </tr>
                    <tbody>
                    {education}
                    </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);