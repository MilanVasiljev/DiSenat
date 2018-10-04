const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if(Validator.isEmpty(data.school)){
        errors.school = 'Ime škole je obavezno';
    }

    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Stepen stručne spreme je obavezan';
    }

    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = 'Polje školovanja je obavezno';
    }

    if(Validator.isEmpty(data.from)){
        errors.from = 'Obavezan je datum pocetka rada';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}