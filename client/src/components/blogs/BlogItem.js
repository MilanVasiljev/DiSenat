import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

class BlogItem extends Component {
    render() {

        const {blog, auth} = this.props;

        return (
            <div>

            </div>
        );
    }
}

BlogItem.propTypes = {
    blog: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(BlogItem);