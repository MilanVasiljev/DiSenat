import React, {Component} from 'react';

class EmailHeader extends Component {
    render() {
        return (
            <div className="email-header">
                <h1 className="email-heading">Poruke</h1>
                <button className="contact-button--1 compose-mail-button">Kreiraj novu poruku</button>
            </div>
        );
    }
}

export default EmailHeader;