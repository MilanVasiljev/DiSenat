import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description:this.state.description
        };

        this.props.addExperience(expData, this.props.history)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render(){

        const { errors } = this.state;

        return(
            <div className="create-profile">

                <Link to="/dashboard" className="contact-button contact-button__registration">Nazad</Link>

                <div className="profile-input">
                    <div className="profile-description">
                        <h1>Dodajte radno iskustvo</h1>
                        <small>Dodajte bilo koje radno iskustvo koje ste imali ranije ili poziciju koju trenutno obavljate</small>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                    <TextFieldGroup
                        placeholder="* Kompanija"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                    />

                        <TextFieldGroup
                            placeholder="* Pozicija"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                        />

                        <TextFieldGroup
                            placeholder="Lokacija firme"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                        />

                        <h6>Datum od</h6>

                        <TextFieldGroup
                            name="from"
                            type="date"
                            value={this.state.from}
                            onChange={this.onChange}
                            error={errors.from}
                        />

                        <h6>do </h6>

                        <TextFieldGroup
                            name="to"
                            type="date"
                            value={this.state.to}
                            onChange={this.onChange}
                            error={errors.to}
                            disabled={this.state.disabled ? 'disabled' : ''}
                        />

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="check-input"
                                name="current"
                                value={this.state.current}
                                checked={this.state.current}
                                onChange={this.onCheck}
                                id="current"
                            />
                            <label htmlFor="current">Trenutni posao</label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Opis radnog mesta"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                            info="Opisite svoju poziciju"
                        />

                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Dodajte radno iskustvo</button>

                    </form>
            </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
