import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description:this.state.description
        };

        this.props.addEducation(eduData, this.props.history)
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
                        <h1>Dodajte istoriju vaseg skolovanja</h1>
                        <small>Dodajte skole ili kurseve koje ste zavrsili ili koje trenutno pohadjate</small>
                    </div>

                    <form onSubmit={this.onSubmit} className="create-profile">

                        <TextFieldGroup
                            placeholder="* Ime skole"
                            name="school"
                            value={this.state.school}
                            onChange={this.onChange}
                            error={errors.school}
                        />

                        <TextFieldGroup
                            placeholder="* Titlula"
                            name="degree"
                            value={this.state.degree}
                            onChange={this.onChange}
                            error={errors.degree}
                        />

                        <TextFieldGroup
                            placeholder="Polje skolovanja"
                            name="fieldofstudy"
                            value={this.state.fieldofstudy}
                            onChange={this.onChange}
                            error={errors.fieldofstudy}
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
                            <label htmlFor="current">Trenutno</label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Opis skolovanja"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                            info="Opisite program koji ste ili studirate"
                        />

                        <button
                            type="submit"
                            value="submit"
                            className="contact-button contact-button__registration" style={{marginBottom: '3rem', alignSelf: 'center'}}>Dodajte skolu</button>

                    </form>
                </div>
            </div>
        )
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
