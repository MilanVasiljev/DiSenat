const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { min: 1, max: 10000 })){
        errors.text = 'Post mora imati minimum 1 i najvise 10000 karaktera'
    }


    if(Validator.isEmpty(data.text)){
        errors.text = 'Obavezno je uneti tekst prilikom postavljanja posta';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}