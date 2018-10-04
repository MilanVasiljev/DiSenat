import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextFieldGroup from "./TextFieldGroup";

const InputGroup = ({
                                name,
                                placeholder,
                                value,
                                error,
                                icon,
                                type,
                                onChange
                            }) => {
    return (
        <div className="social-networks">

            <div className="input-group-social">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>

            <input
                placeholder={placeholder}
                name={name}
                className={classnames('text-input text-input__input text-input__input--veliko', {
                    'invalidreg': error
                })}
                value={value}
                onChange={onChange}
            />
            {error && (<div className="invalid-message"><p className="invalid-message">{error}</p></div>)}
        </div>
    )
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;