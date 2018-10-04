import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';

class CommentItem extends Component {

    onDeleteClick(postId, commentId){
        this.props.deleteComment(postId, commentId);
    }

    render() {

        const {comment, postId, auth} = this.props;

        return (
            <div>
                <li>

                    <div className="comment-avatar"><img src={require(`../../images/${comment.avatar}`)} alt=""/></div>

                    <div className="comment-box">
                        <div className="comment-head">
                            <h6 className="comment-name"><a href={`/profile/${comment.handle}`}>{comment.firstname} {comment.lastname}</a></h6>
                            <span><Moment format="YYYY/MM/DD">{comment.date}</Moment></span>
                            {/*<i className="fa fa-reply"></i>*/}
                            {/*<i className="fa fa-heart"></i>*/}
                            {comment.user === auth.user.id ? (
                                <i
                                    onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                                    style={{color: '#999'}}
                                    className="fa fa-times likes-heart"></i>
                            ) : null}
                        </div>
                        <div className="comment-content">
                            {renderHTML(comment.text)}
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}



CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);