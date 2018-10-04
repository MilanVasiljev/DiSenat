const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// POST Model
const Post = require('../../models/Post');
// PROFILE MODEL
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc  Test posts route
// @access PUBLIC
router.get('/test', (req, res) => {
    res.json({msg: "Posts Works"})
});


// @route GET api/posts
// @desc  Get all posts
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'Nije pronadjen ni jedan post'}));

});

// @route GET api/posts/:id
// @desc  Get single post by ID
// @access PRIVATE
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostfound: 'Nema posta sa tim id-om'}));

});


// @route POST api/posts
// @desc  Create post
// @access PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validatePostInput(req.body);

    // Check validation
    if(!isValid){
        // If any errors, send 400 with error object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        title: req.body.title,
        imageurl: req.body.imageurl,
        text: req.body.text,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatar: req.body.avatar,
        handle: req.body.handle,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post));
});


// @route DELETE api/posts/:id
// @desc  Delete post
// @access PRIVATE
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({notauthorize: 'User not authorized'});
                    }

                    // Delete
                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({postnotfound: 'Nije pronadjen ovaj post'}));
        })

});

// @route POST api/posts/like/:id
// @desc  Like post
// @access PRIVATE
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        // return res.status(400).json({alreadyliked: 'Vec ste lajkovali ovaj post'});
                        // Remove like if exists
                        const removeIndex = post.likes.map(item => item.user.toString())
                            .indexOf(req.user.id);
                        // Splice out of array
                        post.likes.splice(removeIndex, 1);
                        // Save
                        post.save().then(post => res.json(post));
                        return;
                    }
                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));

                })
                .catch(err => res.status(404).json({postnotfound: 'Nije pronadjen ovaj post'}));
        })
});


// @route POST api/posts/comment/:id
// @desc  Add comment to post
// @access PRIVATE
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validatePostInput(req.body);

    // Check validation
    if(!isValid){
        // If any errors, send 400 with error object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                avatar: req.body.avatar,
                handle: req.body.handle,
                user: req.user.id
            }

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post))
                .catch(err => res.status(404).json({ postnotfound: 'Nije pronadjen post' }));
        })

});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Remove comment from post
// @access PRIVATE
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id)
        .then(post => {

            // Check if comment exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotexists: 'Komentar ne postoji' });
            }

            // Get remove index
            const removeIndex = post.comments.map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            // Splice comment out of array
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));

        })
                .catch(err => res.status(404).json({ postnotfound: 'Nije pronadjen post' }));


});




module.exports = router;