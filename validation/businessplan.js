const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBussinesplanInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(Validator.isEmpty(data.title)){
        errors.title = 'Obavezno ime biznis plana';
    }

    if(Validator.isEmpty(data.description)){
        errors.description = 'Obavezan tekst biznis plana';
    }

    if (!isEmpty(data.imageurl)){
        if(!Validator.isURL(data.imageurl)){
            errors.imageurl = 'Url nije validan';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}