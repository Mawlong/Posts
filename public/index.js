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
        
         _self.getComments = function() {
          $http.get('/comments')
            .then(function(response) {
              _self.comments = response.data;
            })
            .catch(function(response) {
              console.error(response.data);
            })
        };

           
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

        $scope.delete = function(id) {
          $http.delete('/comments/'+id)
            .then(function(response){
              console.log("Successful!");

              _self.getComments();
            })
            .catch(function(response){
                  console.log("failed");
            })
        }


           // $scope.dislike = function(id,downvotes) {
        //   downvotes++;
        //   console.log(id,downvotes)
        //   $http.put('/comments/'+id)
        //     .then(function(response) {
        //       console.log("success! on HTML");
        //     })
        //     .catch(function(response){
        //         console.log("fail!");
        //     })
        // };
        
        $scope.like = function(id,upvotes) {
          upvotes++;
          console.log(id,upvotes)
          // $http.put('/comments/'+id)
          //   .then(function(response) {
          //     console.log("success!");
          //   })
          //   .catch(function(response){
          //       console.log("fail! on HTML");
          //   })
        };
        
        $scope.dislike = function(id,downvotes) {
          downvotes++;
          console.log(id,downvotes);
          // $http.put('/comments/' +id)
          // .then(function(response) {
          //     console.log("success!");
          //   })
          //   .catch(function(response){
          //       console.log("fail! on HTML");
          //   })
        };
      }])