import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import {addComment} from "../../actions/postActions";
import {getCurrentProfile} from "../../actions/profileActions";

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            text: '',
            errors: {}
        };
        this.onQuillChange = this.onQuillChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Right away
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
    }

    onQuillChange(e){
        this.setState({text: e})
    }

    onSubmit(e){
        e.preventDefault();

        const { user } = this.props.auth;
        const  {profile} = this.props.profile;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
            handle: profile.handle

        };

        this.props.addComment(postId, newComment);
        this.setState({text: ''});
    }


    render() {

        const { errors } = this.state;

        return (
            <div>

                <form onSubmit={this.onSubmit} className="enter-post">
                    <ReactQuill
                        style={{marginBottom: '4rem', marginTop: '2rem', color: '#000', borderBottom: '0px'}}
                        modules={CommentForm.modules}
                        formats={CommentForm.formats}
                        placeholder="Unesite komentar"
                        name="text"
                        value={this.state.text}
                        onChange={this.onQuillChange}
                        error={errors.text}
                    />
                    <button type="submit" style={{marginTop: '2rem'}}>Potvrdi</button>
                </form>

            </div>
        );
    }
}

CommentForm.modules = {
    toolbar: [
        ['link', 'image', 'video']
    ]
};

CommentForm.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];

CommentForm.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, {getCurrentProfile, addComment})(CommentForm);