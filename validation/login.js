const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.preporuka = !isEmpty(data.preporuka) ? data.preporuka : '';


    if(!Validator.isEmail(data.email)){
        errors.email = 'Nepravilna email adresa';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email polje je obavezno popuniti';
    }


    if(Validator.isEmpty(data.password)){
        errors.password = 'Polje sa šifrom je obavezno popuniti';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}