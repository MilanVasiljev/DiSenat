import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addArticle } from '../../actions/profileActions';
import SelectListGroup from "../common/SelectListGroup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            articletext: '',
            category: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onQuillChange = this.onQuillChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();

        const articleData = {
            title: this.state.title,
            image: this.state.image,
            articletext: this.state.articletext,
            category: this.state.category
        };

        this.props.addArticle(articleData, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onQuillChange(e){
        this.setState({articletext: e})
    }

    render(){

        // Select options for status
        const options = [
            {label: '* Izaberite kategoriju artikla', value: 0},
            {label: 'Vesti', value: 'Vesti'},
            {label: 'O nama', value: 'O nama'},
            {label: 'Di club', value: 'Di club'},
            {label: 'Vip Card', value: 'Vip Card'},
            {label: 'Partneri', value: 'Partneri'}
        ];

        const { errors } = this.state;

        return(
            <div className="create-profile">

                <Link to="/dashboard" className="contact-button contact-button__registration">Nazad</Link>

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Kreirajte novi artikal</h1>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                        <TextFieldGroup
                            placeholder="* Naziv artikla"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                        />

                        <TextFieldGroup
                            placeholder="Slika (opciono)"
                            name="image"
                            value={this.state.image}
                            onChange={this.onChange}
                            error={errors.image}
                        />

                        <SelectListGroup
                            placeholder="Izaberite kategoriju"
                            name="category"
                            value={this.state.category}
                            onChange={this.onChange}
                            error={errors.category}
                            info="Kategorija"
                            options={options}
                        />

                        <ReactQuill
                            style={{marginBottom: '4rem', marginTop: '2rem'}}
                            modules={AddArticle.modules}
                            formats={AddArticle.formats}
                            placeholder="Tekst artikla"
                            name="articletext"
                            value={this.state.articletext}
                            onChange={this.onQuillChange}
                            error={errors.articletext}
                        />

                        {/*<TextAreaFieldGroup*/}
                            {/*placeholder="Tekst artikla"*/}
                            {/*name="articletext"*/}
                            {/*value={this.state.articletext}*/}
                            {/*onChange={this.onChange}*/}
                            {/*error={errors.articletext}*/}
                            {/*info="Kompletan tekst artikla"*/}
                        {/*/>*/}


                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Kreirajte novi artikal</button>

                    </form>
                </div>
            </div>
        )
    }
}

AddArticle.propTypes = {
    addArticle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

AddArticle.modules = {
  toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, {'font': []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']

  ]
};

AddArticle.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];

export default connect(mapStateToProps, {addArticle})(withRouter(AddArticle));
