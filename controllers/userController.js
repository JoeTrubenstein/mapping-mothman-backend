const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {

  signupAndLogInFB: (params) => {

        return new Promise((resolve, reject) => {

            User.findOne({email: params.email})
                .then(user => {
                  
                    //console.log(user)
                    
                    if (user) {
                      console.log('17')
                      console.log('----')
                      // console.log('user.password: ', user.password)
                      console.log('params.name: ', params.name)
                      console.log('params.email: ' , params.email)
                      // bcrypt.compare(params.password, user.password, function(err, res) {
                        // res === true
        
                            const payload = {
                              id: user._id, 
                              email: user.email,
                              username: user.username
                            }
    
                            jwt.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 3600
                            }, (err, token) => {
  
                              if (err) {
                                  reject(err);
                              } else {
                                console.log('line 38');
                                
                                  let success = {};
                                  success.confirmation = true; 
                                  success.token = `Bearer ${token}`;
                                  resolve(success);
                              }
                            })
                        
                    } else {
                      console.log('65 -create new user')
                      let newUser;
                      console.log(JSON.stringify(params.picture.data))
                      console.log('---------')
                        if(params.accessToken){
                           newUser = new User({
                            email: params.email,
                            isFacebook: true,
                            profile: {
                              username: params.name
                            },
                            facebookID: params.id, 
                            facebookPicture: params.picture
                             
                          });

                          newUser.save()
                          .then( user => {

                           const payload = {
                               id: user._id, 
                               email: user.email,
                               username: user.username
                           }

                           jwt.sign(payload, process.env.SECRET_KEY, {
                               expiresIn: 3600
                           }, (err, token) => {
                               if (err) {
                                   reject(err);
                               } else {
                                   let success = {};
                                   success.confirmation = true; 
                                   success.token = `Bearer ${token}`;
                                   resolve(success);
                                   console.log('jwt auth success: ', success);
                                   
                               }

                           })

                          })
                          .catch( error => {
                              reject(error);
                          })


                        } else {
                           newUser = new User({
                            email: params.email,
                            password: params.password,
                            profile: {
                              username: params.name,
                              picture: params.picture
                            }
                        });

                        bcrypt.genSalt(10, (err, salt) => {

                          bcrypt.hash(newUser.password, salt, (err, hash) => {

                              if (err) {
                                  reject(err);
                              } else {
                                  newUser.password = hash;

                                  newUser.save()
                                         .then( user => {

                                          const payload = {
                                              id: user._id, 
                                              email: user.email,
                                              username: user.username
                                          }

                                          jwt.sign(payload, process.env.SECRET_KEY, {
                                              expiresIn: 3600
                                          }, (err, token) => {

                                              if (err) {
                                                  reject(err);
                                              } else {
                                                  let success = {};
                                                  success.confirmation = true; 
                                                  success.token = `Bearer ${token}`;
                                                  resolve(success);
                                              }

                                          })

                                         })
                                         .catch( error => {
                                             reject(error);
                                         })
                                  
                              }

                          })

                      });
                        }
                     

                   

                    }
                })
                .catch( error => {
                    reject(error);
                })
        });
    },

    login: (params) => {
    console.log('userController login: ', params);
    
    const email = params.email;
    const password = params.password;
    console.log('password: ', password);
    

    return new Promise((resolve, reject) => {

        User.findOne({ email })
            .then(user => {

                if (user) {
                    bcrypt.compare(password, user.password)
                          .then( isMatch => {
                            console.log('is match: ', isMatch);
                            
                            if (isMatch) {
                                const payload = {
                                    id: user._id, 
                                    email: user.email,
                                    username: user.username
                                }

                                jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: 3600
                                }, (err, token) => {

                                    if (err) {
                                        reject(err)
                                    } else {
                                        let success = {};
                                        success.confirmation = true; 
                                        success.token = `Bearer ${token}`;
                                        resolve(success);
                                    }
                                });
                            } else {
                                let errors = {};
                                errors.message = 'username not found or check your password!';
                                errors.status = 400; 
                                reject(errors);
                            }
                          })
                          .catch( error => {
                            reject(error);
                          })
                } else {
                  let errors = {};
                                errors.message = 'username not found or check your password!';
                                errors.status = 400; 
                                console.log('error message: ', errors.message);
                                
                                reject(errors);
                }
            })
            .catch( error => {
              console.log('error from userController: ', error);
              
            })
    });

},

  signUp: function(params) {
    console.log('usercontroller params: ', params);
    
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          if (user) {
            let errors = {};
            errors.message = "Email already exists. Please log in.";
            errors.status = 400;
            reject(errors);
          } else {
            const newUser = new User();

            newUser.profile.name = params.name;
            newUser.password = params.password;
            newUser.email = params.email;

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  reject(err);
                } else {
                  newUser.password = hash;

                  newUser.save()
                         .then( user => {
                          const payload = {
                              id: user._id, 
                              email: user.email
                          }

                          jwt.sign(payload, process.env.SECRET_KEY, {
                              expiresIn: 3600
                          }, (err, token) => {

                              if (err) {
                                  reject(err);
                              } else {
                                console.log('usercontroller token: ', token);
                                
                                  let success = {};
                                  success.confirmation = true; 
                                  success.token = `Bearer ${token}`;
                                  resolve(success);
                              }
                          })
                         })
                         .catch( error => {
                             reject(error);
                         })
                  
              }
              });
            });
          }
        })
        .catch(error => {
          let errors = {};
          errors.message = error;
          errors.status = 400;
          reject(errors);
        });
    });
  },

  getUserInfo: function(params) {
    return new Promise((resolve, reject) => {
      User.findById({ _id: params._id })
        .then(user => {
          console.log(user);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateProfile: function(req) {
    return new Promise((resolve, reject) => {
      User.findById({ _id: req.user._id })
        .then(user => {
          user.email = req.body.email;
          user.profile.name = req.body.name;
          user.save();
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
