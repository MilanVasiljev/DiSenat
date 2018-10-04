import React from 'react';
import {Link} from 'react-router-dom';

const AdminActions = () => {

    return(
        <div className="profile-manager-buttons-wrapper">

            <Link to='/add-article' className="contact-button contact-button__registration profile-manager-buttons">
                <i className="fas fa-newspaper a-bit-of-margin" /> Dodajte artikal
            </Link>

            <Link to='/zahtevi' className="contact-button contact-button__registration profile-manager-buttons">
                <i className="fas fa-newspaper a-bit-of-margin" /> Zahtevi za clanstvo
            </Link>

            <Link to='/add-vip-card' className="contact-button contact-button__registration profile-manager-buttons">
                <i className="fas fa-newspaper a-bit-of-margin" /> Vip Kartice
            </Link>

        </div>
    )

}

export default AdminActions;