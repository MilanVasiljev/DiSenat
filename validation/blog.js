const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogInput(data) {
    let errors = {};

    data.category = !isEmpty(data.category) ? data.category : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.imageurl = !isEmpty(data.imageurl) ? data.imageurl : '';
    data.text = !isEmpty(data.text) ? data.text : '';

    if(Validator.isEmpty(data.category)){
        errors.category = 'Obavezna je kategorija';
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Obavezan je naziv bloga';
    }

    if(Validator.isEmpty(data.imageurl)){
        errors.imageurl = 'Obavezan je url slike';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Obavezan tekst bloga';
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