const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const validateArticleInput = require('../../validation/articles');
const validateBussinesplanInput = require('../../validation/businessplan');
const validateCompanyInput = require('../../validation/company');
const validateVipCardInput = require('../../validation/vipcard');


// Load profile and user model
const Profile = require('../../models/Profile');
const User = require('../../models/User');



// @route GET api/profile/test
// @desc  Test profile route
// @access PUBLIC
router.get('/test', (req, res) => {
    res.json({msg: "Profile Works"})
});


// @route GET api/profile
// @desc  Get current users profile
// @access PRIVATE
router.get('/', passport.authenticate('jwt',  { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['firstname', 'lastname', 'email', 'avatar'])
        .then(profile => {
           if (!profile) {
               errors.noprofile = 'Ne postoji profil ovog korisnika';
               return res.status(404).json(errors);
           }
           res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle
// @desc  Get profile by handle
// @access PRIVATE
router.get('/handle/:handle', passport.authenticate('jwt',  { session: false }), (req, res) => {
    const errors = {};
   Profile.findOne({ handle: req.params.handle })
       .populate('user', ['firstname', 'lastname', 'email', 'avatar'])
       .then(profile => {
          if(!profile){
              errors.noprofile = 'Ne postoji korisnik sa ovim profilom';
              res.status(404).json(errors);
          }
          res.json(profile);
       })
       .catch(err => res.status(404).json({profile: 'Ne postoji profil sa ovim korisnikom'}));
});


// @route GET api/profile/all
// @desc  Get all profiles
// @access PRIVATE
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['firstname', 'lastname', 'email', 'avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'Ne postoji korisnik sa ovim profilom';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profile: 'Nema profila'}));
});

// @route GET api/profile/article/:id
// @desc  Get article by article ID
// @access PUBLIC
router.get('/article/:article_id', (req, res) => {
    const errors = {};

    Profile.find()
        .then(result => {

            if(!result){
                errors.noprofile = 'Ne postoji ovaj artikal';
                res.status(404).json(errors);
            }
            res.json(result);
        })
        .catch(err => res.status(404).json({profile: 'Ne postoji ovaj artikal'}));
});


// @route GET api/profile/handle/:id
// @desc  Get profile by user ID
// @access PRIVATE
router.get('/user/:user_id', passport.authenticate('jwt',  { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['firstname', 'lastname', 'email', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'Ne postoji korisnik sa ovim profilom';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'Ne postoji profil sa ovim korisnikom'}));
});


// @route POST api/profile
// @desc  Create or Edit user profile
// @access PRIVATE
router.post('/', passport.authenticate('jwt',  { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;

    // Skills - Split into the array
    if (typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if (profile){
                // Update
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if(profile){
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }
                        // Save Profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    });
            }
        })
});



// @route POST api/profile/experience
// @desc  Add experience to profile
// @access PRIVATE
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

   Profile.findOne({ user: req.user.id })
       .then(profile => {
           const newExp = {
               title: req.body.title,
               company: req.body.company,
               location: req.body.location,
               from: req.body.from,
               to: req.body.to,
               current: req.body.current,
               description: req.body.description
           }
           // Add to experience array
           profile.experience.unshift(newExp);
           profile.save().then(profile => res.json(profile));
       })
});

// @route POST api/profile/vipcard
// @desc  Add vip card to profile
// @access PRIVATE
router.post('/vipcard', (req, res) => {

    const { errors, isValid } = validateVipCardInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    // if (req.user.role !== 'admin'){
    //     return res.status(404).json({role: 'Nemate ovlašćenje za unos i izmenu vip kartica'})
    // }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newCard = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                cardname: req.body.cardname,
                cardnumber: req.body.cardnumber,
                ownerid: req.body.ownerid,
                handle: req.body.handle,
                from: req.body.from,
                to: req.body.to
            }
            // Add to experience array
            profile.vipcard.unshift(newCard);
            profile.save().then(profile => res.json(profile));
        })
});



// @route POST api/profile/education
// @desc  Add education to profile
// @access PRIVATE
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            // Add to experience array
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile));
        })
});


// @route POST api/profile/articles
// @desc  Add articles to the site
// @access PRIVATE
router.post('/article', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateArticleInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    if (req.user.role !== 'admin'){
        return res.status(404).json({role: 'Nemate ovlašćenje za unos novih artikala'})
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newArticle = {
                title: req.body.title,
                image: req.body.image,
                articletext: req.body.articletext,
                category: req.body.category
            }
            // Add to experience array
            profile.article.unshift(newArticle);
            profile.save().then(profile => res.json(profile));
        })
});


// @route POST api/profile/businessplan
// @desc  Add business plan to the profile
// @access PRIVATE
router.post('/businessplan', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateBussinesplanInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newPlan = {
                title: req.body.title,
                imageurl: req.body.imageurl,
                description: req.body.description
            }
            // Add to businessplan array
            profile.businessplan.unshift(newPlan);
            profile.save().then(profile => res.json(profile));
        })
});


// @route POST api/profile/company
// @desc  Add company to the profile
// @access PRIVATE
router.post('/company', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { errors, isValid } = validateCompanyInput(req.body);

    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newCompany = {
                name: req.body.name,
                imageurl: req.body.imageurl,
                fieldofwork: req.body.fieldofwork,
                shortworkdescription: req.body.shortworkdescription,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website,
                handle: req.body.handle,
                description: req.body.description
            }
            // Add to company array
            profile.ownercompany.unshift(newCompany);
            profile.save().then(profile => res.json(profile));
        })
});

// @route DELETE api/profile/company/:cmp_id
// @desc  Delete company
// @access PRIVATE
router.delete('/company/:cmp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.ownercompany
                .map(item => item.id)
                .indexOf(req.params.cmp_id);

            // Splice out of array
            profile.ownercompany.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});



// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience
// @access PRIVATE
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        // Splice out of array
            profile.experience.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});


// @route DELETE api/profile/education/:edu_id
// @desc  Delete education
// @access PRIVATE
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);

            // Splice out of array
            profile.education.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});


// @route DELETE api/profile/articles/:article_id
// @desc  Delete article
// @access PRIVATE
router.delete('/article/:article_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    if (req.user.role !== 'admin'){
        return res.status(404).json({role: 'Nemate ovlašćenje za brisanje artikala'})
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.article
                .map(item => item.id)
                .indexOf(req.params.article_id);

            // Splice out of array
            profile.article.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});




// @route DELETE api/profile/businessplan/:businessplan_id
// @desc  Delete businessplan
// @access PRIVATE
router.delete('/businessplan/:businessplan_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    // if (req.user.role !== 'admin'){
    //     return res.status(404).json({role: 'Nemate ovlašćenje za brisanje profila'})
    // }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.businessplan
                .map(item => item.id)
                .indexOf(req.params.businessplan_id);

            // Splice out of array
            profile.businessplan.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});


// @route DELETE api/profile/businessplan/:businessplan_id
// @desc  Delete businessplan
// @access PRIVATE
router.delete('/vipcard/:vipcard_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    if (req.user.role !== 'admin'){
        return res.status(404).json({role: 'Nemate ovlašćenje za brisanje profila'})
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.vipcard
                .map(item => item.id)
                .indexOf(req.params.vipcard_id);

            // Splice out of array
            profile.vipcard.splice(removeIndex, 1);

            //Save
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.json(404).json(err))
});


// @route DELETE api/profile/
// @desc  Delete user and profile
// @access PRIVATE
router.delete('/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    if (req.user.role !== 'admin'){
        return res.status(404).json({role: 'Nemate ovlašćenje za brisanje profila'})
    }

    Profile.findOneAndRemove(req.params.user_id)
        .then(() => {
            User.findOneAndRemove(req.params.id)
                .then(() => res.json({success: true}));
        });
});

module.exports = router;