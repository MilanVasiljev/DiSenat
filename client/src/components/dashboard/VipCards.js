import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteVipCard} from '../../actions/profileActions';
import TextFieldGroup from "../common/TextFieldGroup";

class VipCards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this);

    }


    onDeleteClick(id){
        this.props.deleteVipCard(id);
    }

    onSearchChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render(){

        const vipcards = this.props.vipcard.map(exp => (

            exp.firstname.includes(this.state.searchTerm) ||
            exp.lastname.includes(this.state.searchTerm) ||
            exp.cardname.includes(this.state.searchTerm) ||
            exp.cardnumber.includes(this.state.searchTerm) ||
            exp.ownerid.includes(this.state.searchTerm) ||
            exp.handle.includes(this.state.searchTerm)
                ?

            <tr key={exp._id}>
                <td className="table-dashboard__item">{exp.firstname}</td>
                <td className="table-dashboard__item">{exp.lastname}</td>
                <td className="table-dashboard__item">{exp.cardname}</td>
                <td className="table-dashboard__item">{exp.cardnumber}</td>
                <td className="table-dashboard__item">{exp.ownerid}</td>
                <td className="table-dashboard__item">{exp.handle}</td>

                <td className="table-dashboard__item">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (' Danas') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="table-dashboard__button">Obrisi</button></td>
            </tr> : null

        ))

        return(
            <div>
                <div>
                    <TextFieldGroup
                        placeholder="Pretraga"
                        name="searchTerm"
                        value={this.state.searchTerm}
                        onChange={this.onSearchChange}
                    />
                </div>
                <table className="table-dashboard">
                    <thead>
                    <tr>
                        <th className="table-dashboard__item">Ime</th>
                        <th className="table-dashboard__item">Prezime</th>
                        <th className="table-dashboard__item">Ime Kartice</th>
                        <th className="table-dashboard__item">Broj kartice</th>
                        <th className="table-dashboard__item">Id korisnika</th>
                        <th className="table-dashboard__item">Likn korisnika</th>
                        <th className="table-dashboard__item">Period izdavanja i isteka</th>
                        <th></th>
                    </tr>
                    <tbody>
                    {vipcards}
                    </tbody>
                    </thead>
                </table>
            </div>
        )
    }
}

VipCards.propTypes = {
    deleteVipCard: PropTypes.func.isRequired
}

export default connect(null, {deleteVipCard})(VipCards);