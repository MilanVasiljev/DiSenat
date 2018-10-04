import React, {Component} from 'react';
import PropTypes from 'prop-types';
import renderHtml from 'react-render-html';
import connect from "react-redux/es/connect/connect";
import {getReplies} from "../../../actions/emailActions";

class EmailItem extends Component {

    constructor(props) {
        super(props);

        this.reloadReplies = this.reloadReplies.bind(this);
    }

    componentDidUpdate(){
        let id = this.props.mailId
        this.reloadReplies(id)
    }


    reloadReplies(id){
        // preventDefault(id);
        this.props.getReplies(id);
    }

    render() {

        let selectedMail, mailId;
        let replies;
        selectedMail = this.props.selectedMail;
        mailId = this.props.mailId;

        // console.log('replies: ' + this.props.replies)
        replies = this.props.replies.map(reply => {
            return (
                <div className="reply-container">
                    <p className="reply-container--username">{reply.username}</p>
                    <p className="reply-container--content" key={reply._id}>{renderHtml(reply.replymessage)}</p>
                </div>
            )
        })

        return (
            this.props.mailId === this.props.selectedMail ?
            <div className="opened-mail">

                <h3 className="opened-mail--title">{this.props.emailTitle}</h3>
                <p className="opened-mail--username">{this.props.username}</p>

                <p className="opened-mail--content">{renderHtml(this.props.emailMessage)}</p>

                {replies}
            </div> : null
        );
    }
}


EmailItem.propTypes = {
    getReplies: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    emails: state.email
});

export default connect(mapStateToProps, {getReplies})(EmailItem);