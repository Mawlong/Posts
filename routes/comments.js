const express = require('express');
const Comments = require('../models/Comments');

const router = express.Router();

router.get('/', function(request, response) {

  Comments.find().lean().exec()
    .then(function(comments) {
      response.json(comments);
    })
    .catch(function(err) {
      response.status(500).json(err)
    });

});

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

router.put('/:id', function(request, response) {
  const id = request.params.id;
  const like = request.body.like;
  const dislike = request.body.dislike;
  // Comments.update({_id:id},{$inc:{upvotes:1}}, function(err) {
  //   if(err){
  //     console.log(err);
  //   }
  //   Comments.findOne({_id:id}, function(err){
  //     if(err){
  //       console.log(err);
  //     }
  //   })
  // })
  if(dislike === 1){
    Comments.findByIdAndUpdate(id,{$inc:{downvotes:1}})
    .then(function(comment){
      response.json(comment);
    })
    .catch(function(err){
      response.status(500).json(err);
    })
  }
  if(like === 1){
    Comments.findByIdAndUpdate(id,{$inc:{upvotes:1}})
    .then(function(comment){
      response.json(comment);
    })
    .catch(function(err){
      response.status(500).json(err);
    })
  }
});

  // Comments.findByIdAndUpdate(id, 
    
  //   { $inc: {upvote:1 }},
  //   { new: true })
  //   .then(function(newUpvote) {
  //     response.json(newUpvote);
  //   })
  //   .catch(function(err) {
  //     response.status(500).json(err)
  //   })

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

module.exports = router;