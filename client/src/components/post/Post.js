import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPost } from '../../actions/postActions';

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post, loading } = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <p>Ucitavam</p>;
        } else {
            postContent = (
                <div>
                    <div className="post-wrapper">
                        <PostItem post={post} showActions={false} showDelete={true} />
                    </div>
                    <CommentForm postId={post._id} />
                </div>
            );
        }

        return (
            <div className="post" style={{backgroundColor: 'white', padding: '1rem'}}>
                <div className="">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/postovi" className="contact-button" style={{fontSize: '1.4rem', padding: '0'}}>
                                Nazad na postove
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
