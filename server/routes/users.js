var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BookCollection = require("../models/BookCollectionSchema");

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};

var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


/* GET session Data. */
router.get('/', function(req, res, next) {
  console.log("Getting Cookie Data");
  console.log(req.session);

  if(req.session.username)
  {
    res.send(req.session.username)
  }
  else
    {
      res.send(null)
    }
});


//Building Strategy to use for signing up
passport.use("register", new LocalStrategy
(
    {passReqToCallback: true},

    (req,user,password,done)=>
    {
      console.log("Entered Strategy");
      BookCollection.findOne({username: user.username}, (err,results)=>
      {
        if(err)
        {
          console.log("error on startup");
          return done(err);
        }
        if(results)
        {
          console.log("Error: User Already Exists");
          return done(null,false,{message:"Account Exists"});
        }
        else
          {
            console.log("Made it Through strategy");

            var newUser = new BookCollection();

            newUser.username = req.body.username;
            newUser.password = createHash(password);

            newUser.save((err)=>
            {
              if(err)
              {
                console.log("Cannot save User");
                throw err;
              }
            });

            console.log("New User Made");

            return done(null,newUser);
          }
      })
    }
));


/* add a new users listing with a post */
router.post('/',
    passport.authenticate("register",
        {
          failureRedirect:"/failed"
        }),
    (req, res, next)=> {
  res.send('made a new user');
});


// Local Strategy {copied from past lecture for times sake} for making sure a user exists and the information entered is correct
passport.use(new LocalStrategy(
    // req is the request of the route that called the strategy
    // username and password are passed by passport by default
    // done is the function to end the strategy (callback function).
    (username, password, done)=> {
      console.log("Local Strat");
      // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
      BookCollection.findOne({ username: username }, function (err, user) {
        // If there is a MongoDB/Mongoose error, send the error
        if (err) {console.log("1");
          return done(err); }
        // If there is not a user in the database, it's a failure and send the message below
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username.' });
        }
        // Check to see if the password typed into the form and the user's saved password is the same.
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("4");
        console.log(user);
        // null is here because there is not an error
        // user is the results of the findOne function
        return done(null, user, { user: user.username });
      });
    }
));

//runs the strategy for logging in and confirming information entered is correct
router.post("/login",
    passport.authenticate
    ('local',
        {failureRedirect:"/failure"}
    ),
    (req,res)=>
{

  req.session.username= req.body.username;
  req.session.save();
  console.log(req.session);
  console.log(req.body.username);
  res.send("you logged in")
});

router.get("/logout",(req,res)=>
{
  console.log(req.session + "Logging off");
  req.session = null;
  res.send("you logged out");
});

module.exports = router;
