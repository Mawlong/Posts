angular.module('demo', [])
      .controller('DemoCtrl', ['$scope','$http', function($scope,$http) {
       
        const _self = this;
        _self.name     = '';
        _self.text     = '';
        _self.comments = [];

        _self.onSubmit = function(e) {
          e.preventDefault();
          _self.addComment();
        };
      
        _self.$onInit = function() {
          _self.getComments();
        };

        //listing all the comments
        
         _self.getComments = function() {
          $http.get('/comments')
            .then(function(response) {
              _self.comments = response.data;
            })
            .catch(function(response) {
              console.error(response.data);
            })
        };  
        //add comment request 
        
        _self.addComment = function() {
          $http.post('/comments', { comment: _self.text, name: _self.name })
            .then(function(response) {
              console.log(response.data);

              _self.text = '';
              _self.name = '';

              
              _self.getComments();
            })
            .catch(function(response) {
              console.error(response.data)
            });
        };

        //upvote request

        _self.upvote = function(commentId) {
          $http.post('/comments/'+commentId+'/upvotes', { upvotes: 1 })
            .then(function(response) {
              console.log(response.data);

              _self.getComments();
            })
            .catch(function(err) {
              console.error(response.data);
            });
        };

        //downvote request

        _self.downvote = function(commentId) {
          $http.post('/comments/'+commentId+'/downvotes', { downvotes: 1 })
            .then(function(response) {
              console.log(response.data);

              _self.getComments();
            })
            .catch(function(err) {
              console.error(response.data);
            });
        };

        //delete request

        // _self.delete = function(commentId) {
        //   $http.delete('/comments/'+commentId)
        //     .then(function(response){
        //       console.log("Successful!");

        //       _self.getComments();
        //     })
        //     .catch(function(response){
        //           console.log("failed");
        //     })
        // }     
}])