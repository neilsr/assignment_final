var mongoose = require('mongoose');
var User = mongoose.model('User');

//func to get the users profile
module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};

//func to update the users profile
module.exports.profileUpdate = function(req, res) {

  // cos
    console.log('req.body')
    console.log(req.body)
    console.log('req.body')
  
    if (!req.body._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
      
      User
        .findById(req.body._id)
        .exec(function(err, user) {

          if('age' in req.body){
            user.age = req.body.age
          }
          if('cards' in req.body){
            user.cards = req.body.cards
          }
          if('name' in req.body){
            user.name = req.body.name
          }
          if('skills' in req.body){
            user.skills = req.body.skills
          }

          user.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        });
          res.status(200).json(user);
        });
        
    }
  
  };
  
