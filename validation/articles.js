const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.articletext = !isEmpty(data.articletext) ? data.articletext : '';
    data.category = !isEmpty(data.category) ? data.category : '';


    if(Validator.isEmpty(data.title)){
        errors.title = 'Obavezno ime artikla';
    }

    if(Validator.isEmpty(data.articletext)){
        errors.articletext = 'Obavezan tekst artikla';
    }

    if(Validator.isEmpty(data.category)){
        errors.category = 'Obavezan izbor kategorije kojoj artikl pripada';
    }

    if (!isEmpty(data.image)){
        if(!Validator.isURL(data.image)){
            errors.image = 'Url nije validan';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}