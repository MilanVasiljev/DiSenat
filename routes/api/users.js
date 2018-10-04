const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 *1024 * 5
    },
    fileFilter: fileFilter
});

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');


// @route GET api/users/test
// @desc  Test users route
// @access PUBLIC
router.get('/test', (req, res) => {
    res.json({msg: "Users Works"})
});

router.get('/all', (req, res) => {
   User.find()
       .then(users => {
           if(!users){
               errors.noprofile = 'Ne postoji korisnik sa ovim profilom';
               return res.status(404).json(errors);
           }
           res.json(users);
       })
       .catch(err => res.status(404).json({profile: 'Nema profila'}));
});

// ODOBRI KORISNIKA
router.post('/updaterole', (req, res) => {

    // Get fields
    user_id = req.body.id;

    User.findOneAndUpdate({_id: user_id }, { $set: {role: 'user'}}, function(err,doc) {
        if (err) { throw err; }
        else {
            console.log("Updated");
        }
    })
        .then(profile => res.json(profile));
})

// ODBI KORISNIKA
router.post('/rejectrole', (req, res) => {

    // Get fields
    user_id = req.body.id;

    User.findOneAndUpdate({_id: user_id }, { $set: {role: 'rejected'}}, function(err,doc) {
        if (err) { throw err; }
        else {
            console.log("Updated");
        }
    })
        .then(profile => res.json(profile));
})

// @route POST api/users/register
// @desc  Register user
// @access PUBLIC
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    // Look if email exists
    // OVAKO I DA POGLEDA DA LI JE ROLE ADMIN, USER ILI REQUEST
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Email adresa postoji';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg',  // Rating
                    d: 'mm'   // Default
                });

                const newUser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    preporuka: req.body.preporuka
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })

            }
        })
});


// @route POST api/users/login
// @desc  Login user / Returning JWT Token
// @access PUBLIC
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

   const email = req.body.email;
   const password = req.body.password;

   // Find user by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user){
                errors.email = 'Nije pronadjen korisnik sa unetom email adresom';
                return res.status(404).json(errors);
            }
            // Check the ROLE (OVO MOZDA DA STAVIM KAD PROVERI I SIFRU)
            if (user.role === 'request'){
                return res.status(404).json({role: 'Your application is waiting for approval, Thank you'})
            }

            if (user.role === 'rejected'){
                return res.status(404).json({role: 'Your application is rejected. If anything change we will nofity you'})
            }
            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){

                        // User Matched
                        const payload = {
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            avatar: user.avatar,
                            preporuka: user.preporuka,
                            role: user.role
                        } // Create JWT Payload

                        // Sign Token and expiration
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                    } else {
                        errors.password = 'Neispravna šifra'
                        return res.status(400).json(errors);
                    }
                })
        });
});


// @route GET api/users/current
// @desc  Return current user
// @access PRIVATE
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

    // OVO DOLE RADI ZA PROVERU ADMINA

    // if (req.user.role === 'user'){
    //     res.json({
    //         id: req.user.id
    //     });
    // }
    res.json({
       id: req.user.id,
       firstname: req.user.firstname,
       lastname: req.user.lastname,
        avatar: req.user.avatar
    });

});

// @route POST api/users/uploadavatar
// @desc  Upload image and update avatar
// @access PRIVATE
router.post('/uploadavatar', upload.single('profileImage'), (req, res) => {

    console.log(req.file);
    // Get fields
    user_id = req.body.id;

    User.findOneAndUpdate({_id: user_id }, { $set: {avatar: req.file.filename}}, function(err,doc) {
        if (err) { throw err; }
        else {
            console.log("Updated");
        }
    })
        .then(profile => res.json(profile));

    console.log(req.file);

});


module.exports = router;