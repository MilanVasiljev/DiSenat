import React, {Component} from 'react';
import {Link} from "react-router-dom";
import isEmpty from "../../../validation/is-empty";

class FriendItem extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <div className="table-dashboard__businessplan">
                    <div className="profile-list">

                        <Link to={`/profile/${this.props.profile.handle}`}>
                            <img src={require(`../../../images/${this.props.profile.user.avatar}`)} alt="" className="profile-wrapper__image"/>
                        </Link>

                        <div>
                            <Link
                                to={`/profile/${this.props.profile.handle}`}
                                className="profile-list__username">{this.props.profile.user.firstname} {this.props.profile.user.lastname}
                            </Link>

                            <p className="profile-list__data">
                                {this.props.profile.status} {isEmpty(this.props.profile.company) ? null : (`u ${this.props.profile.company}`)}
                            </p>

                            <p className="profile-list__data">
                                {isEmpty(this.props.profile.country) ? null : `Drzava: ${this.props.profile.country}`} {isEmpty(this.props.profile.city) ? null : `, Grad: ${this.props.profile.city}`}
                            </p>

                            <div>

                            </div>
                        </div>



                    </div>
                </div>


            </div>
        );
    }
}

export default FriendItem;