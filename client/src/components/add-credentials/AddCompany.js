import React, { Component } from 'react';
import { Link, withRouter, Redirect  } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCompany } from '../../actions/profileActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let handleName;
class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageurl: '',
            fieldofwork: '',
            shortworkdescription: '',
            country: '',
            city: '',
            address: '',
            phone: '',
            email: '',
            website: '',
            handle: '',
            description: '',
            redirect: false,
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

    componentDidMount(){
        if(this.props.profile.profile) {
            handleName = this.props.profile.profile.handle;
            console.log(handleName)

            if(handleName !== undefined || handleName !== null){
                this.setState({
                    handle: handleName
                },
                    console.log(this.state.handle)
                    )
            }

        } else {
            if(handleName === undefined){
                this.setState({
                    redirect: true
                })
            }
        }
    }

    onSubmit(e){
        e.preventDefault();


        const companyData = {
            name: this.state.name,
            imageurl: this.state.imageurl,
            fieldofwork: this.state.fieldofwork,
            shortworkdescription: this.state.shortworkdescription,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            website: this.state.website,
            handle: this.state.handle,
            description: this.state.description
        };

        this.props.addCompany(companyData, this.props.history)
        // console.log(this.state.handle)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onQuillChange(e){
        this.setState({description: e})
    }

    render(){

        const { errors } = this.state;
        // {console.log(this.state.redirect)}

        {if(this.state.redirect === true){
            console.log('redirect me')
            return <Redirect to='/dashboard'/>
        }}

        return(
            <div className="create-profile">

                <Link to="/dashboard" className="contact-button contact-button__registration">Nazad</Link>

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Kreirajte kompaniju</h1>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                        <TextFieldGroup
                            placeholder="* Naziv kompanije/biznisa"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        />

                        <TextFieldGroup
                            placeholder="Logo ili slika kompanije"
                            name="imageurl"
                            value={this.state.imageurl}
                            onChange={this.onChange}
                            error={errors.imageurl}
                        />

                        <TextFieldGroup
                            placeholder="* Polje rada"
                            name="fieldofwork"
                            value={this.state.fieldofwork}
                            onChange={this.onChange}
                            error={errors.fieldofwork}
                        />

                        <TextFieldGroup
                            placeholder="* Kratak opis rada (do 50 karaktera)"
                            name="shortworkdescription"
                            value={this.state.shortworkdescription}
                            onChange={this.onChange}
                            error={errors.shortworkdescription}
                        />

                        <TextFieldGroup
                            placeholder="* Drzava"
                            name="country"
                            value={this.state.country}
                            onChange={this.onChange}
                            error={errors.country}
                        />

                        <TextFieldGroup
                            placeholder="* Grad/Mesto"
                            name="city"
                            value={this.state.city}
                            onChange={this.onChange}
                            error={errors.city}
                        />

                        <TextFieldGroup
                            placeholder="* Adresa (Ulica i broj)"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            error={errors.address}
                        />

                        <TextFieldGroup
                            placeholder="* Telefon kompanije"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                            error={errors.phone}
                        />

                        <TextFieldGroup
                            placeholder="* Email kompanije"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                        />

                        <TextFieldGroup
                            placeholder="Web sajt kompanije (opciono)"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                        />


                        <ReactQuill
                            style={{marginBottom: '4rem', marginTop: '2rem'}}
                            modules={AddCompany.modules}
                            formats={AddCompany.formats}
                            placeholder="Celokupan opis rada kompanije (popuniti sto detaljnije)"
                            name="description"
                            value={this.state.description}
                            onChange={this.onQuillChange}
                            error={errors.description}
                        />

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

AddCompany.propTypes = {
    addCompany: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

AddCompany.modules = {
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

AddCompany.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];

export default connect(mapStateToProps, {addCompany})(withRouter(AddCompany));
