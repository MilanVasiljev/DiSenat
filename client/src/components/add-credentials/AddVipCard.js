import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addVipCard } from '../../actions/profileActions';
import {getProfiles} from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";

class AddVipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            cardname: '',
            cardnumber: '',
            ownerid: '',
            handle: '',
            from: '',
            to: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onEmailSelect = this.onEmailSelect.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors})
        }
    }

    componentDidMount(){
        this.props.getProfiles();
    }

    onSubmit(e){
        e.preventDefault();

        const vipcardData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            cardname: this.state.cardname,
            handle: this.state.handle,
            cardnumber: this.state.cardnumber,
            ownerid: this.state.ownerid,
            from: this.state.from,
            to: this.state.to
        };

        this.props.addVipCard(vipcardData, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onEmailSelect(e){
        console.log('prosledio sam: ' + e.target.value)

        const {profiles} =  this.props.profile;

        if(profiles)
            profiles.map(profile => {
                // console.log(profile.user.email)
                if(profile.user.email === e.target.value){
                    this.setState({firstname: profile.user.firstname})
                    this.setState({lastname: profile.user.lastname})
                    this.setState({ownerid: profile.user._id})
                    this.setState({handle: profile.handle})
                }
            })
    }

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render(){

        const {profiles} =  this.props.profile;

        // console.log(profiles);

        let alreadyUsedEmails = [];
        let mailsLoaded = false;

        if(profiles)
        for(let i = 0; i < profiles.length; i++){

                let owid = profiles[i].vipcard;
                // console.log(owid)
                owid.map(item => {
                    // console.log(item.ownerid)
                    alreadyUsedEmails.push(item.ownerid)
                })


        }
        if(alreadyUsedEmails.length > 0) {
            // console.log(alreadyUsedEmails)
            mailsLoaded = true;
            // console.log(mailsLoaded)
        }

        const emailOptions = [
            {label: '* Izaberite email korisnika', value: 0}
        ];

        if(emailOptions.length>0){
            // console.log(emailOptions)
        }

        if(profiles)
            profiles.map(profile => {
                // console.log(profile.user.email)
                let email = profile.user.email;
                let userId = profile.vipcard._id;

                if(emailOptions && !emailOptions.includes(email))

                    if(!alreadyUsedEmails.includes(profile.user._id))
                    emailOptions.push({label: email, value: email})

            })



        const { errors } = this.state;

        return(
            <div className="create-profile">

                <Link to="/dashboard" className="contact-button contact-button__registration">Nazad</Link>

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Dodajte Vip Karticu</h1>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">


                        <SelectListGroup
                            placeholder="Izaberite email korisnika"
                            name="email"
                            value={this.state.email}
                            onChange={this.onEmailSelect}
                            error={errors.email}
                            info="Email"
                            options={emailOptions}
                        />


                        <TextFieldGroup
                            placeholder="* Ime"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            error={errors.firstname}
                            disabled={true}
                        />

                        <TextFieldGroup
                            placeholder="* Prezime"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            error={errors.lastname}
                            disabled={true}
                        />

                        <TextFieldGroup
                            placeholder="Id korisnika"
                            name="ownerid"
                            value={this.state.ownerid}
                            onChange={this.onChange}
                            error={errors.ownerid}
                            disabled={true}
                        />

                        <TextFieldGroup
                            placeholder="Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            disabled={true}
                        />

                        <TextFieldGroup
                            placeholder="Ime kartice"
                            name="cardname"
                            value={this.state.cardname}
                            onChange={this.onChange}
                            error={errors.cardname}
                        />

                        <TextFieldGroup
                            placeholder="Broj kartice"
                            name="cardnumber"
                            value={this.state.cardnumber}
                            onChange={this.onChange}
                            error={errors.cardnumber}
                        />

                        <h6>Datum izdavanja</h6>

                        <TextFieldGroup
                            name="from"
                            type="date"
                            value={this.state.from}
                            onChange={this.onChange}
                            error={errors.from}
                        />

                        <h6>Datum isteka </h6>

                        <TextFieldGroup
                            name="to"
                            type="date"
                            value={this.state.to}
                            onChange={this.onChange}
                            error={errors.to}
                        />

                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Dodajte korisnika Vip Kartice</button>

                    </form>
                </div>
            </div>
        )
    }
}

AddVipCard.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    addVipCard: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addVipCard,getProfiles})(withRouter(AddVipCard));
