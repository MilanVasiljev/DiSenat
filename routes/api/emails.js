const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Email = require('../../models/Email');

router.get('/test', (req, res) => {
    res.json({msg: "Email Works"})
});


// @route GET api/emails
// @desc  Get all Emails
// @access PRIVATE
router.get('/', (req, res) => {

    Email.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'Nemate poruka'}));

});



// @route POST api/emails
// @desc  Create post
// @access PRIVATE
router.post('/', (req, res) => {

    // const {errors, isValid} = validatePostInput(req.body);

    // Check validation
    // if(!isValid){
    //     // If any errors, send 400 with error object
    //     return res.status(400).json(errors);
    // }

    const newEmail = new Email({
        mailsender: req.body.mailsender,
        mailrecipient: req.body.mailrecipient,
        mailtitle: req.body.mailtitle,
        mailmessage: req.body.mailmessage,
        handle: req.body.handle,
        avatar: req.body.avatar,
        username: req.body.username
    });

    newEmail.save()
        .then(post => res.json(post));
});


// @route POST api/emails/reply/:id
// @desc  Add reply to mail
// @access PRIVATE
router.post('/reply/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    // const {errors, isValid} = validatePostInput(req.body);

    // Check validation
    // if(!isValid){
    //     // If any errors, send 400 with error object
    //     return res.status(400).json(errors);
    // }

    Email.findById(req.params.id)
        .then(email => {
            const newReply = {
                replysender: req.body.replysender,
                replymessage: req.body.replymessage,
                avatar: req.body.avatar,
                handle: req.body.handle,
                avatar: req.body.avatar,
                username: req.body.username
            }

            // Add to comments array
            email.replies.push(newReply);

            // Save
            email.save().then(email => res.json(post))
                .catch(err => res.status(404).json({ postnotfound: 'Nije pronadjen post' }));
        })

});

// Find email by ID
router.get('/email/:email_id', (req, res) => {
    const errors = {};

    Email.find()
        .then(result => {

            if(!result){
                errors.noprofile = 'Ne postoji ovaj email';
                res.status(404).json(errors);
            }
            res.json(result);
        })
        .catch(err => res.status(404).json({profile: 'Ne postoji ovaj email'}));
});



module.exports = router;