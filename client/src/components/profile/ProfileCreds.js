import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from "../../validation/is-empty";
import renderHtml from 'react-render-html';

class ProfileCreds extends Component {
    render() {

        const {experience, education, businessplan} = this.props;

        const expItems = experience.map((exp => (
            <li key={exp._id} className="skills-wrapper skills-wrapper__iskustvo liste-podataka">
                <h4 className="liste-podataka__ime">{exp.company}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (' Danas') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </p>
            </li>
        )));

        const eduItems = education.map((edu => (
            <li key={edu._id} className="skills-wrapper skills-wrapper__iskustvo liste-podataka">
                <h4 className="liste-podataka__ime">{edu.school}</h4>
                <p className="liste-podataka__ime">{edu.fieldofstudy}</p>
                <p>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (' Danas') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </p>
            </li>
        )));

        const busPlan = businessplan.map((bp => (
            <li key={bp._id} className="skills-wrapper skills-wrapper__iskustvo liste-podataka busplan">
                <h4 className="liste-podataka__ime busplan__ime">{bp.title}</h4>
                <img src={bp.imageurl} alt=""/>
                <p className="liste-podataka__ime busplan__opis">{renderHtml(bp.description)}</p>
                <button className="contact-button contact-button__centered">Zainteresovan sam za saradnju</button>
                <p className="liste-podataka__ime busplan__opis text-info">Ukoliko ste zainteresovani za saradnju bilo u vidu investicije ili druge vrste saradnje posaljite poruku klikom na dugme iznad</p>
            </li>
        )));

        return (
            <div className="about-wrapper">
                {isEmpty(expItems) ? null :
                <div className="grid-items-profile">
                <h1 className="seenon-text seenon-text__dark" style={{margin: '1rem'}}>Radno iskustvo:</h1>
                {expItems}
                </div> }
                {isEmpty(eduItems) ? null :
                <div className="grid-items-profile">
                    <h1 className="seenon-text seenon-text__dark" style={{margin: '1rem'}}>Škole i kursevi:</h1>
                    {eduItems}
                </div> }

                {isEmpty(busPlan) ? null :
                <div className="grid-full-wrap">
                    <h1 className="seenon-text seenon-text__dark" style={{margin: '1rem'}}>Biznis planovi:</h1>
                    {busPlan}
                </div>}
            </div>
        );
    }
}

export default ProfileCreds;