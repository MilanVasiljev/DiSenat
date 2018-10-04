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

    // Min Max Firstname
    if (!Validator.isLength(data.firstname, { min: 2, max: 20 })){
        errors.firstname = 'Ime mora sadrzati minimum 2 i maksimum 20 karaktera';
    }

    // Min Max Lastname
    if (!Validator.isLength(data.lastname, { min: 2, max: 20 })){
        errors.lastname = 'Prezime mora sadrzati minimum 2 i maksimum 20 karaktera';
    }

    if(Validator.isEmpty(data.firstname)){
        errors.firstname = 'Polje sa imenom je obavezno popuniti';
    }

    if(Validator.isEmpty(data.lastname)){
        errors.lastname = 'Polje sa prezimenom je obavezno popuniti';
    }

    if(Validator.isEmpty(data.preporuka)){
        errors.preporuka = 'Preporuku je obavezno popuniti';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email polje je obavezno popuniti';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Nepravilna email adresa';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Polje sa šifrom je obavezno popuniti';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Šifra mora imati najmanje 6 karaktera';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Ponovite šifru';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Šifre se ne poklapaju';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}