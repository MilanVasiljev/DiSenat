const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVipCardInput(data) {
    let errors = {};

    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.cardname = !isEmpty(data.cardname) ? data.cardname : '';
    data.cardnumber = !isEmpty(data.cardnumber) ? data.cardnumber : '';
    data.ownerid = !isEmpty(data.ownerid) ? data.ownerid : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.to = !isEmpty(data.to) ? data.to : '';


    if(Validator.isEmpty(data.firstname)){
        errors.firstname = 'Ime je obavezno';
    }

    if(Validator.isEmpty(data.lastname)){
        errors.lastname = 'Prezime je obavezno';
    }

    if(Validator.isEmpty(data.cardname)){
        errors.cardname = 'Naziv kartice je obavezan';
    }

    if(Validator.isEmpty(data.cardnumber)){
        errors.cardnumber = 'Broj kartice je obavezan';
    }

    if(Validator.isEmpty(data.ownerid)){
        errors.ownerid = 'Doslo je do greske prilikom selekcije clana, molimo vas da osvezite stranicu na browser-u';
    }

    if(Validator.isEmpty(data.from)){
        errors.from = 'Obavezan je datum izdavanja kartice';
    }

    if(Validator.isEmpty(data.to)){
        errors.to = 'Obavezan je datum isteka kartice';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}