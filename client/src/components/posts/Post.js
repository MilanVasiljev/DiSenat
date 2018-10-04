import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import {getPosts} from "../../actions/postActions";
import PostFeed from './PostFeed';


class Post extends Component {

    componentDidMount(){
        this.props.getPosts();
    }


    render() {

        const {posts, loading} = this.props.post;

        let postContent;

        if(posts === null || loading){
            <p>Ucitavam...</p>
        } else {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div style={{backgroundColor: 'white', padding: '1rem'}} className="">

                <PostForm />

                {postContent}

            </div>
        );
    }
}

Post.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Post);