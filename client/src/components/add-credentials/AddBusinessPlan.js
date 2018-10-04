import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBusinessPlan } from '../../actions/profileActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AddBusinessPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            imageurl: '',
            description: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onQuillChange = this.onQuillChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();

        const bpData = {
            title: this.state.title,
            imageurl: this.state.imageurl,
            description: this.state.description,
        };

        this.props.addBusinessPlan(bpData, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onQuillChange(e){
        this.setState({description: e})
    }

    render(){

        const { errors } = this.state;

        return(
            <div className="create-profile">

                <Link to="/dashboard" className="contact-button contact-button__registration">Nazad</Link>

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Kreirajte biznis plan</h1>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                        <TextFieldGroup
                            placeholder="* Naziv biznis plana"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                        />

                        <TextFieldGroup
                            placeholder="Slika (opciono)"
                            name="imageurl"
                            value={this.state.imageurl}
                            onChange={this.onChange}
                            error={errors.imageurl}
                        />


                        <ReactQuill
                            style={{marginBottom: '4rem', marginTop: '2rem'}}
                            modules={AddBusinessPlan.modules}
                            formats={AddBusinessPlan.formats}
                            placeholder="Tekst biznis plana"
                            name="description"
                            value={this.state.description}
                            onChange={this.onQuillChange}
                            error={errors.description}
                        />

                        {/*<TextAreaFieldGroup*/}
                            {/*placeholder="Tekst biznis plana"*/}
                            {/*name="description"*/}
                            {/*value={this.state.description}*/}
                            {/*onChange={this.onChange}*/}
                            {/*error={errors.description}*/}
                            {/*info="Kompletan tekst biznis plana"*/}
                        {/*/>*/}

                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Kreirajte biznis plan</button>

                    </form>
                </div>
            </div>
        )
    }
}

AddBusinessPlan.propTypes = {
    addBusinessPlan: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

AddBusinessPlan.modules = {
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

AddBusinessPlan.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];

export default connect(mapStateToProps, {addBusinessPlan})(withRouter(AddBusinessPlan));
