import React from 'react';
import {Link} from 'react-router-dom';

const ProfileActions = (props) => {

    return(
      <div className="profile-manager-buttons-wrapper">
          {console.log(props.profile.handle)}

          <Link to='/edit-profile' className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fas fa-user-circle a-bit-of-margin" /> Izmenite profil
          </Link>

          <Link to='/add-experience' className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fab fa-black-tie a-bit-of-margin" /> Dodajte radno iskustvo
          </Link>

          <Link to='/add-education' className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fas fa-graduation-cap a-bit-of-margin" /> Dodajte stručnu spremu
          </Link>

          <Link to='/add-business-plan' className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fas fa-user-tie a-bit-of-margin" /> Kreirajte biznis plan
          </Link>

          <Link
              handle={props.profile.handle}
              to='/add-company'
              className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fas fa-user-tie a-bit-of-margin" /> Kreirajte vasu kompaniju
          </Link>

          <Link to={`/profile/${props.profile.handle}`} className="contact-button contact-button__registration profile-manager-buttons">
              <i className="fas fa-user-tie a-bit-of-margin" /> Moj profil
          </Link>

      </div>
    )

}

export default ProfileActions;