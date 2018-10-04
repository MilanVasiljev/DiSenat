import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem'

class CommentFeed extends Component {
    render() {

        const {comments, postId} = this.props;

        return comments.map(comment =>
            <ul className="comments-list reply-list">
            <CommentItem key={comment._id} comment={comment} postId={postId} />
            </ul>
        )
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
}

export default CommentFeed;