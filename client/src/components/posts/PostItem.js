import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CommentItem from '../post/CommentItem'
import {Link} from 'react-router-dom';
import renderHTML from 'react-render-html';
import {deletePost, addLike} from "../../actions/postActions";
import CommentFeed from "../post/CommentFeed";
import CommentForm from "../post/CommentForm";
import Moment from "react-moment";
import {getCurrentProfile} from "../../actions/profileActions";

class PostItem extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick(id){
        this.props.deletePost(id);
    }

    onLikeClick(id){
        this.props.addLike(id);
    }

    findUserLike(likes){
        const {auth} = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true;
        } else {
            return false;
        }
    }

    render() {

        const {post, auth, showActions, showDelete} = this.props;
         const {profile} = this.props.profile;


        return (
            <div className="post-card">

                <div className="comments-container">

                    <ul id="comments-list" className="comments-list">
                        <li>
                            <div className="comment-main-level">

                                <div className="comment-avatar"><img src={require(`../../images/${post.avatar}`)} alt=""/></div>

                                <div className="comment-box">

                                    <div className={classNames('comment-head', {
                                        'comment-head comment-head-liked' : this.findUserLike(post.likes)
                                    })}>

                                        <h6 className="comment-name by-author"><Link to={`/profile/${post.handle}`}>{post.firstname} {post.lastname}</Link></h6>
                                        <span style={{color: '#999'}}><Moment format="YYYY/MM/DD">{post.date}</Moment></span>



                                        {showActions ? (<span style={{float: 'right'}}>
                                            {post.user === auth.user.id ? (
                                                <i
                                                    onClick={this.onDeleteClick.bind(this, post._id)}
                                                    style={{color: '#999'}}
                                                    className="fa fa-times likes-heart"></i>
                                            ) : null}

                                            <i
                                                onClick={this.onLikeClick.bind(this, post._id)}
                                                className="fa fa-heart likes-heart is-liked">
                                            <span className="number-of-likes is-liked">{post.likes.length}
                                            </span>
                                        </i>
                                        </span>) : null}



                                    </div>
                                    <div className="comment-content">
                                        {renderHTML(post.text)}
                                    </div>
                                </div>
                            </div>

                            {showActions ? (<span>
                            <ul className="comments-list reply-list">

                                {post.comments.map(comment =>
                                    <div>
                                    <CommentItem key={comment._id} comment={comment} postId={post._id} showDelete={true}/>
                                    </div>)
                                }

                                {showActions ?
                                <Link className="" style={{color: '#03658c', textAlign: 'right', fontSize: '1.4rem'}} to={`/post/${post._id}`}>Pogledajte sve komentare</Link>
                            : null}
                            </ul> </span>) : <CommentFeed postId={post._id} comments={post.comments} />}

                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true,
    showDelete: false
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {deletePost, addLike, getCurrentProfile})(PostItem);