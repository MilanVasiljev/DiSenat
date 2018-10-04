import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile, getRequests} from '../../actions/profileActions';
import ZahteviItem from './ZahteviItem';
import axios from 'axios';

class Zahtevi extends Component {

    state = {
        users: []
    }


    // Right away
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentDidMount(){
        axios.get('/api/users/all')
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }

    odobriKorisnika = (user_id) => {

        axios.post('api/users/updaterole', {id:user_id})
            .then(res => {
                console.log(res.data);
                // this.props.history.push('/zahtevi');
                window.location.reload();
            })

        console.log(user_id);
    }

    odbiKorisnika = (user_id) => {

        axios.post('api/users/rejectrole', {id:user_id})
            .then(res => {
                console.log(res.data);
                // this.props.history.push('/zahtevi');
                window.location.reload();
            })

        console.log(user_id);
    }


    render(){

        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        const requests = (
            <div>
                {this.state.users.map(person =>
                person.role === 'request' ?
                    <div key={person._id} className="profile-content zahtevi-za-clanstvo">
                         <p className="profile-list__username zahtevi-za-clanstvo__text">Ime: {person.firstname}</p>
                         <p className="profile-list__username zahtevi-za-clanstvo__text">Prezime: {person.lastname}</p>
                         <p className="profile-list__username zahtevi-za-clanstvo__text">Email: {person.email}</p>
                         <p className="profile-list__username zahtevi-za-clanstvo__text">Preporuka: {person.preporuka}</p>
                        <div>
                            <button className="zahtevi-za-clanstvo__accept" onClick={() => this.odobriKorisnika(person._id)}>Odobri zahtev</button>
                            <button className="zahtevi-za-clanstvo__reject" onClick={() => this.odbiKorisnika(person._id)}>Odbi zahtev</button>

                        </div>
                    </div>
                    :null
                )}
            </div>
        )

        return(
            <div className="table-dashboard__businessplan clanstvo-wrapper">

                    <h1>Zahtevi za registraciju</h1>
                {user.role === 'admin' ?
                    <ul>
                        {requests}
                    </ul>
                    : <p>Nemate pravo na ovu stranicu</p>}
            </div>
        )
    }
}

Zahtevi.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(Zahtevi);