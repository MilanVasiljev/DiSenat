import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteCompany} from "../../actions/profileActions";

class Companies extends Component {

    onDeleteClick(id){
        this.props.deleteCompany(id);
        console.log(id)
    }


    render(){

        console.log(this.props)

        const companies = this.props.companies.map(exp => (
            <tr key={exp._id}>
                <td className="table-dashboard__item">{exp.name}</td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="table-dashboard__button">Obrisi</button></td>
            </tr>
        ))

        return(
            <div>
                <p className="experience-title">Vase kompanije</p>
                <table className="table-dashboard">
                    <thead>
                    <tr>
                        <th className="table-dashboard__item">Kompanija</th>

                        <th></th>
                    </tr>
                    <tbody>
                    {companies}
                    </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}

Companies.propTypes = {
    deleteCompany: PropTypes.func.isRequired
}

export default connect(null, {deleteCompany})(Companies);