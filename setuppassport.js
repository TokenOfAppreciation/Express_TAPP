const passport = require('passport');
const User = require('./models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

// -- setting up credentials

const credentials = {
  "facebook": {
    app_id:"562977827370286"
    ,app_secret:"09a366d73b8f7e0e67d6dc27f8bb97ad"
    ,callback:"http://185.243.9.118:8080/auth/facebook/callback"
  }
}

module.exports = function (){

  passport.use(new FacebookStrategy({
    clientID: "562977827370286",
    clientSecret: "09a366d73b8f7e0e67d6dc27f8bb97ad",
    callbackURL: "http://185.243.9.118:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'third_party_id'],
    // passReqToCallback : true,
    enableProof: true,
    session: false
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile.id);
    console.log(profile.displayName);
    console.log(profile.emails);
    User.findOrCreate({email: profile.emails[0].value},
      function(err, user) {
        if (err) {
          console.log('Im in the booboo-zone');
          return done(err);
        } else {
        console.log('Got past the error.');
        done(null, user);
       }
    });
  }
));

  passport.serializeUser(function(user, done) {
      console.log(user);
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        console.log('Deserialized');
          done(err, user);
      });
  });
}
