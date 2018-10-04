import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import {getCurrentProfile} from "../../actions/profileActions";
import {addPost} from "../../actions/postActions";



class PostForm extends Component {



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

    imageHandler() {

    }

    onQuillChange(e){
        this.setState({text: e})
    }

    onSubmit(e){
        e.preventDefault();

        const { user } = this.props.auth;
        const {profile}= this.props.profile;

        const newPost = {
            text: this.state.text,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
            handle: profile.handle

        };

        this.props.addPost(newPost);
        this.setState({text: ''});
    }


    render() {

        const { errors } = this.state;
        let {profile} = this.props.profile;

        return (
            <div>

                <form onSubmit={this.onSubmit} className="enter-post">
                    <ReactQuill
                        style={{marginBottom: '4rem', marginTop: '2rem'}}
                        modules={PostForm.modules}
                        formats={PostForm.formats}
                        placeholder="Postavite novi post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onQuillChange}
                        error={errors.text}
                    />
                    <button type="submit">Potvrdi</button>
                </form>

            </div>
        );
    }
}


PostForm.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]

};

PostForm.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];


PostForm.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, {getCurrentProfile,addPost})(PostForm);