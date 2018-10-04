import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from "classnames";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            country: '',
            city: '',
            phone: '',
            status: '',
            skills: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}

        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();


        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            country: this.state.country,
            city: this.state.city,
            phone: this.state.phone,
            status: this.state.status,
            skills: this.state.skills,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if(displaySocialInputs){
            socialInputs = (
                <div>

                    <InputGroup
                        placeholder="Twitter URL"
                        name="twitter"
                        icon="fab fa-twitter ikona-mreze"
                        value={this.state.twitter}
                        error={errors.twitter}
                        onChange={this.onChange}/>

                    <InputGroup
                        placeholder="Facebook URL"
                        name="facebook"
                        icon="fab fa-facebook ikona-mreze"
                        value={this.state.facebook}
                        error={errors.facebook}
                        onChange={this.onChange}/>

                    <InputGroup
                        placeholder="Linkedin URL"
                        name="linkedin"
                        icon="fab fa-linkedin ikona-mreze"
                        value={this.state.linkedin}
                        error={errors.linkedin}
                        onChange={this.onChange}/>

                    <InputGroup
                        placeholder="Youtube URL"
                        name="youtube"
                        icon="fab fa-youtube ikona-mreze"
                        value={this.state.youtube}
                        error={errors.youtube}
                        onChange={this.onChange}/>

                    <InputGroup
                        placeholder="instagram URL"
                        name="instagram"
                        icon="fab fa-instagram ikona-mreze"
                        value={this.state.instagram}
                        error={errors.instagram}
                        onChange={this.onChange}/>

                </div>


            )
        }
        // Select options for status
        const options = [
            {label: '* Izaberite oblast rada', value: 0},
            {label: 'Preduzetnik', value: 'Preduzetnik'},
            {label: 'Menadzer', value: 'Menadzer'},
            {label: 'Konsultant', value: 'Konsultant'},
            {label: 'Investitor', value: 'Investitor'}
        ];

        return(
            <div className="create-profile">

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Kreirajte vas profil</h1>
                        <p>Popunite vas profil informacijama</p>
                        <small>* = Obavezna polja</small>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                    <TextFieldGroup
                        placeholder="* Adresa vaseg profila (npr. disenat.net/petar-petrovic)"
                        name="handle"
                        value={this.state.handle}
                        info="Handle koji mora biti unikatan"
                        error={errors.handle}
                        onChange={this.onChange}/>

                     <SelectListGroup
                         placeholder="Status"
                         name="status"
                         value={this.state.status}
                         onChange={this.onChange}
                         error={errors.status}
                         info="Cime se bavite"
                         options={options}/>

                        <TextFieldGroup
                            placeholder="Kompanija"
                            name="company"
                            value={this.state.company}
                            info="Kompanija u kojoj radite ili ciji ste vlasnik"
                            error={errors.company}
                            onChange={this.onChange}/>

                        <TextFieldGroup
                            placeholder="Web sajt"
                            name="website"
                            value={this.state.website}
                            info="Vaš web sajt"
                            error={errors.website}
                            onChange={this.onChange}/>


                        <TextFieldGroup
                            placeholder="Država"
                            name="country"
                            value={this.state.country}
                            info="Država"
                            error={errors.country}
                            onChange={this.onChange}/>

                        <TextFieldGroup
                            placeholder="Grad"
                            name="city"
                            value={this.state.city}
                            info="Država"
                            error={errors.city}
                            onChange={this.onChange}/>

                        <TextFieldGroup
                            placeholder="Telefon"
                            name="phone"
                            value={this.state.phone}
                            info="Država"
                            error={errors.phone}
                            onChange={this.onChange}/>

                        <TextFieldGroup
                            placeholder="* Znanja"
                            name="skills"
                            value={this.state.skills}
                            info="Odvajajte znanja koja imate zarezima"
                            error={errors.skills}
                            onChange={this.onChange}/>

                        <TextAreaFieldGroup
                            placeholder="Kratka biografija"
                            name="bio"
                            value={this.state.bio}
                            info="Recite nam nesto o vama"
                            error={errors.bio}
                            onChange={this.onChange}/>

                        <div className="expand-social">
                            <div
                                type="button"
                                onClick={()=> {
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }))
                            }}
                                    className="contact-button" style={{margin: 'auto'}}>
                                <i className="fas fa-angle-double-down expand-social"></i>
                                Drustvene mreze (opciono)</div>
                        </div>


                        {socialInputs}

                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Kreirajte profil</button>


                    </form>
                </div>

            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));