var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  
  let saveData = JSON.parse(req.body.data)
  var user = new User();

  user.name = saveData.name;
  user.email = saveData.email;

  user.age = saveData.age;
  user.skills = saveData.skills;

  let file1SaveName = req.files.file1[0].filename+'_resized.'+req.files.file1[0].originalname.split('.').pop()
  let file2SaveName = req.files.file2[0].filename+'_resized.'+req.files.file2[0].originalname.split('.').pop()

  user.file1 = file1SaveName//req.files.file1[0].filename
  user.file2 = file2SaveName//req.files.file2[0].filename
  user.cards = ''
  user.defaultImage = saveData.defaultImage;

  user.setPassword(saveData.password);

  user.save(function (err) {
    console.log(err);
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });

    const sharp = require('sharp');
    const fs = require('fs');

    sharp('./uploads/'+req.files.file1[0].filename)
    .resize(1280, 960)
    .toBuffer()
    .then( data => {
        fs.writeFileSync('./uploads/'+file1SaveName, data);
    })
    .catch( err => {
        console.log(err);
    });	
    
    sharp('./uploads/'+req.files.file2[0].filename)
    .resize(1280, 960)
    .toBuffer()
    .then( data => {
        fs.writeFileSync('./uploads/'+file2SaveName, data);
    })
    .catch( err => {
        console.log(err);
    });	

    console.log('comes here last')
  });

};

module.exports.login = function (req, res) {

  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};