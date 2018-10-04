import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BlogForm from './BlogForm';
import {getBlogs} from "../../actions/blogActions";
import BlogFeed from './BlogFeed';

class Blog extends Component {

    componentDidMount(){
        this.props.getBlogs();
    }

    render() {

        const {blogs, loading} = this.props.blog;

        let blogContent;

        if(blogs === null || loading){
            <p>Ucitavam...</p>
        } else {
            blogContent = <BlogFeed blogs={blogs} />
        }

        return (
            <div>
                <BlogForm/>
                {blogContent}
            </div>
        );
    }
}

Blog.propTypes = {
    getBlogs: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, {getBlogs})(Blog);