import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
    render() {

        const { posts } = this.props;

        let postovi = posts.map(post => <PostItem key={post._id} post={post}/>)
        return(
     <div className="post-wrapper">
         {postovi}
     </div>
        )
    }
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;