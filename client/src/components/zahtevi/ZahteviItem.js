import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ZahteviItem extends Component {
    render(){

        const {user} = this.props;

        return(
            <div className="table-dashboard__businessplan">
                <div className="profile-list">
                    <div>
                        <p className="profile-list__username">{user.firstname}</p>
                        <p className="profile-list__username">{user.lastname}</p>
                        <p className="profile-list__username">{user.preporuka}</p>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ZahteviItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ZahteviItem;