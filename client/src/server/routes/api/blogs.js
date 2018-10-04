const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Blog = require('../../models/Blog');

// Validation
const validateBlogInput = require('../../validation/blog');
const validateCommentInput = require('../../validation/comment');
// PROFILE MODEL
const Profile = require('../../models/Profile');


// @route GET api/posts/test
// @desc  Test posts route
// @access PUBLIC
router.get('/test', (req, res) => {
    res.json({msg: "Blog Works"})
});


// @route GET api/blog
// @desc  Get all blogs
// @access PUBLIC
router.get('/', (req, res) => {

    Blog.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({noblogsfound: 'Nije pronadjen ni jedan blog tekst'}));

});


// @route GET api/blog/:id
// @desc  Get one blog post by id
// @access PUBLIC
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Blog.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(404).json({noblogfound: 'Nema bloga sa tim id-om'}));

});


// @route POST api/blog
// @desc  Create post
// @access PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validateBlogInput(req.body);

    // Check validation
    if(!isValid){
        // If any errors, send 400 with error object
        return res.status(400).json(errors);
    }


    const newBlog = new Blog({
        category: req.body.category,
        title: req.body.title,
        imageurl: req.body.imageurl,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newBlog.save()
        .then(blog => res.json(blog));
});


// @route DELETE api/blog/:id
// @desc  Delete blog
// @access PRIVATE
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Blog.findById(req.params.id)
                .then(blog => {
                    // Check for post owner
                    if(blog.user.toString() !== req.user.id){
                        return res.status(401).json({notauthorize: 'User not authorized'});
                    }

                    // Delete
                    blog.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({blognotfound: 'Nije pronadjen ovaj post'}));
        })

});


// @route POST api/blog/like/:id
// @desc  Like blog post
// @access PRIVATE
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Blog.findById(req.params.id)
                .then(blog => {
                    if(blog.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        // return res.status(400).json({alreadyliked: 'Vec ste lajkovali ovaj post'});
                        // Remove like if exists
                        const removeIndex = blog.likes.map(item => item.user.toString())
                            .indexOf(req.user.id);
                        // Splice out of array
                        blog.likes.splice(removeIndex, 1);
                        // Save
                        blog.save().then(blog => res.json(blog));
                        return;
                    }
                    // Add user id to likes array
                    blog.likes.unshift({ user: req.user.id });

                    blog.save().then(blog => res.json(blog));

                })
                .catch(err => res.status(404).json({postnotfound: 'Nije pronadjen ovaj blog'}));
        })
});


// @route POST api/blog/comment/:id
// @desc  Add comment to BLOG post
// @access PRIVATE
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validateCommentInput(req.body);

    // Check validation
    if(!isValid){
        // If any errors, send 400 with error object
        return res.status(400).json(errors);
    }

    Blog.findById(req.params.id)
        .then(blog => {
            const newComment = {
                text: req.body.text,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                user: req.user.id
            }

            // Add to comments array
            blog.comments.unshift(newComment);

            // Save
            blog.save().then(blog => res.json(blog))
                .catch(err => res.status(404).json({ blognotfound: 'Nije pronadjen blog post' }));
        })

});


// @route DELETE api/blog/comment/:id/:comment_id
// @desc  Remove comment from BLOG post
// @access PRIVATE
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Blog.findById(req.params.id)
        .then(blog => {

            // Check if comment exists
            if (blog.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotexists: 'Komentar ne postoji' });
            }

            // Get remove index
            const removeIndex = blog.comments.map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            // Splice comment out of array
            blog.comments.splice(removeIndex, 1);
            blog.save().then(blog => res.json(blog));

        })
        .catch(err => res.status(404).json({ postnotfound: 'Nije pronadjen blog post' }));


});


module.exports = router;