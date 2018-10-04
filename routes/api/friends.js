const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Friend = require('../../models/Friend');

// @route GET api/profile/test
// @desc  Test profile route
// @access PUBLIC
router.get('/test', (req, res) => {
    res.json({msg: "Friends Works"})
});

// @route POST api/friends/addfriend
// @desc  Add friend
// @access PRIVATE
router.post('/requestfriend', (req, res) => {

        let areThereAny = false;
        let preventAsycn = 'a';

if (!res.headersSent) {

    Friend.find({friends: req.body.friends})
        .then(friend => {

            const newFriend = new Friend({
                        requester: req.body.requester.toString(),
                        recipient: req.body.recipient.toString(),
                    });

            if(friend.length > 0) {
                for(let i = 0; i<friend.length; i++) {
                    preventAsycn = friend[i].requester;

                    if (friend[i].requester === req.body.requester && friend[i].recipient === req.body.recipient) {
                        console.log('Vec postoji')
                        preventAsycn = 'lala';
                        areThereAny = true;
                        break;
                    }

                }
            }

            if(preventAsycn = 'lala'){
                console.log('Prazno')
                console.log(areThereAny)
                if(!areThereAny){
                    newFriend.save()
                            .then(friend => {
                                res.json(friend)
                                areThereAny = false
                                })
                            .catch(err => res.json(err));
                }
            }

        })

}}

);

// @route GET api/friends
// @desc  Get all friendrequests
// @access PRIVATE
router.get('/', (req, res) => {

    Friend.find()
        .sort({date: -1})
        .then(friends => res.json(friends))
        .catch(err => res.status(404).json({nopostsfound: 'Nema zahteva za prijateljstvo'}));

});


// PRIHVATI PRIJATELJSTVO
router.post('/acceptfriend', (req, res) => {

    // Get fields
    friend_id = req.body.id;
    console.log(friend_id)

    Friend.findOneAndUpdate({_id: friend_id }, { $set: {status: 'friends'}}, function(err,doc) {
        if (err) { throw err; }
        else {
            console.log("Updated");
        }
    })
        .then(friends => res.json(friends));
})



module.exports = router;