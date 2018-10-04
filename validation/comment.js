const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { max: 500 })){
        errors.text = 'Komentar moze imatii najvise 500 karaktera'
    }


    if(Validator.isEmpty(data.text)){
        errors.text = 'Obavezno je uneti tekst prilikom postavljanja posta';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}