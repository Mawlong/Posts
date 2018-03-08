const express = require('express');
const Comments = require('../models/Comments');

const router = express.Router();

//used to render all the posts

router.get('/', function(request, response) {
  Comments.find().lean().exec()
    .then(function(comments) {
      response.json(comments);
    })
    .catch(function(err) {
      response.status(500).json(err)
    });

});

//used to add a post

router.post('/', function(request, response) {
  const name    = request.body.name;
  const comment = request.body.comment;

  Comments.create({ comment: comment, name: name })
    .then(function(comment) {
      response.json(comment);
    })
    .catch(function(err){
      response.status(500).json(err);
    })
});

//deleting a post

router.delete('/:id', function(request, response) {
  const id = request.params.id;

  Comments.findByIdAndRemove(id)
    .then(function(){
      response.end();
    })
    .catch(function(err){
      response.status(500).json(err)
    })
});

//Used to update the number of Upvotes on a post

router.post('/:id/upvotes/', function(request, response) {
  const id = request.params.id;
  const upvotes = request.body.upvotes;
  const query = { _id: id };
  const update = {
    $inc: {
      upvotes: upvotes
    },    
  }

  Comments.findOneAndUpdate(query, update, { new: true }).exec()
    .then(function(comment) {
      response.json(comment);
    })
    .catch(function(err) {
      response.status(500).json(err);
    })
});

//Used to update the number of downvotes on a post

router.post('/:id/downvotes/', function(request, response) {
  const id = request.params.id;
  const downvotes = request.body.downvotes;
  const query = { _id: id };
  const update = {
    $inc: {
      downvotes: downvotes
    },
  }

  Comments.findOneAndUpdate(query, update, { new: true }).exec()
    .then(function(comment) {
      response.json(comment);
    })
    .catch(function(err) {
      response.status(500).json(err);
    })
  });

module.exports = router;