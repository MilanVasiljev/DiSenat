import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
                            name,
                            placeholder,
                            value,
                            error,
                            info,
                            onChange
                        }) => {
    return (
        <div>

            <textarea
                placeholder={placeholder}
                name={name}
                className={classnames('text-input text-input__input text-input__input--veliko', {
                    'invalidreg': error
                })}
                value={value}
                onChange={onChange}
            />

            {/*{info && <small className="">{info}</small>}*/}
            {error && (<div className="invalid-message"><p className="invalid-message">{error}</p></div>)}
        </div>
    )
};

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup;