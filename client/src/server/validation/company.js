const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.imageurl = !isEmpty(data.imageurl) ? data.imageurl : '';
    data.fieldofwork = !isEmpty(data.fieldofwork) ? data.fieldofwork : '';
    data.shortworkdescription = !isEmpty(data.shortworkdescription) ? data.shortworkdescription : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Nepravilna email adresa';
    }

    if (!isEmpty(data.imageurl)){
        if(!Validator.isURL(data.imageurl)){
            errors.imageurl = 'Url nije validan';
        }
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Obavezno ime firme';
    }

    if(Validator.isEmpty(data.imageurl)){
        errors.imageurl = 'Logo firme je obavezan';
    }

    if(Validator.isEmpty(data.fieldofwork)){
        errors.fieldofwork = 'Polje obavljanja delatnosti je obavezno';
    }

    if(Validator.isEmpty(data.shortworkdescription)){
        errors.shortworkdescription = 'Kratak opis obavljanja delatnosti je obavezan';
    }

    if(Validator.isEmpty(data.country)){
        errors.country = 'Drzava je obavezna';
    }

    if(Validator.isEmpty(data.city)){
        errors.city = 'Mesto firme je obavezno';
    }

    if(Validator.isEmpty(data.address)){
        errors.address = 'Adresa (ulica i broj) je obavezna';
    }

    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Telefon firme je obavenaz';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email firme je obavezan';
    }

    if(Validator.isEmpty(data.description)){
        errors.description = 'Opis firme je obavezan';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}