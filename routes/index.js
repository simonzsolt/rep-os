var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    Vers = mongoose.model('Vers'),
    Account = require('../public/models/users'),
    passport = require('passport');


// =============================BACKEND CRUD API ROUTING=============================

// -----------------------------POST-----------------------------

router.route('/data')

    .post(function(req, res){

         if (!req.isAuthenticated()) {
                res.sendStatus(401);
            }

        else {

            console.log('authenticated: ' + req.user.username);

            var newVers  = new Vers(); // cahnged vers to newVers
            newVers.rmva = req.body.rmva;
            newVers.inc  = req.body.inc;

            newVers.auth_role_name = req.body.auth_role_name;
            newVers.auth_surname   = req.body.auth_surname;
            newVers.auth_add_name  = req.body.auth_add_name;
            newVers.auth_forename  = req.body.auth_forename;

            newVers.title    = req.body.title;
            newVers.arg      = req.body.arg;
            newVers.adnotam  = req.body.adnotam;
            newVers.acro     = req.body.acro;
            newVers.acro_int = req.body.acro_int;
            newVers.krono    = req.body.krono;
            newVers.head     = req.body.head;

            newVers.signo_type      = req.body.signo_type;
            newVers.signo_role_name = req.body.signo_role_name; 
            newVers.signo_surname   = req.body.signo_surname;    
            newVers.signo_add_name  = req.body.signo_add_name;   
            newVers.signo_forename  = req.body.signo_forename;  

            newVers.lenght      = req.body.lenght;
            newVers.lenght_unit = req.body.lenght_unit;
            newVers.col         = req.body.col;
            newVers.date        = req.body.date;
            newVers.date_info   = req.body.date_info;
            newVers.place       = req.body.place;
            newVers.place_info  = req.body.place_info;
            newVers.conf        = req.body.conf;
            newVers.source      = req.body.source;
            newVers.text        = req.body.text;
            newVers.imgs        = req.body.imgs;
            newVers.link_coll   = req.body.link_coll;
            newVers.created_at  = Date.now(); // changed to Date.now()
            newVers.created_by  = req.body.created_by;
            newVers.last_mod    = Date.now(); // changed to Date.now()
            newVers.mod_by      = req.body.mod_by;
         

            newVers.save(function(err){
                if(err)
                    res.send(err);
                res.json({ msg: 'vers létrehozva req_auth_body:' + req.body.auth});
            });
        }

        })

        .get(function(req, res){
            Vers.find(function(err, data){
                if (err)
                    res.send(err);
                res.json(data);
            });
        });

        

// -----------------------------ID ROUTE-----------------------------

// _____________________________GET BY ID_____________________________


router.route('/data/:vers_id')

    .get(function(req, res){
        Vers.findById(req.params.vers_id, function(err, vers){
            if (err)
                res.send(err);
            res.json(vers);
        });
    })

// _____________________________UPDATE_____________________________


    .put(function(req, res){

         if (!req.isAuthenticated()) {
        res.sendStatus(401);
        }

        else {
            console.log('authenticated: ' + req.user.username);

            Vers.findById(req.params.vers_id, function(err, vers){
                if (err)
                   res.send(err);

                vers.rmva = req.body.rmva;
                vers.inc = req.body.inc;
           
                vers.auth_role_name = req.body.auth_role_name;
                vers.auth_surname   = req.body.auth_surname;
                vers.auth_add_name  = req.body.auth_add_name;
                vers.auth_forename  = req.body.auth_forename;

                vers.title = req.body.title;
                vers.arg = req.body.arg;
                vers.adnotam = req.body.adnotam;
                vers.acro = req.body.acro;
                vers.krono = req.body.krono;
                vers.head = req.body.head;

                vers.signo_type = req.body.signo_type;
                vers.signo_role_name = req.body.signo_role_name; 
                vers.signo_surname   = req.body.signo_surname;    
                vers.signo_add_name  = req.body.signo_add_name;   
                vers.signo_forename  = req.body.signo_forename;  


                vers.lenght = req.body.lenght;
                vers.lenght_unit = req.body.lenght_unit;
                vers.col = req.body.col;
                vers.date = req.body.date;
                vers.date_info = req.body.date_info;
                vers.place = req.body.place;
                vers.place_info = req.body.place_info;
                vers.conf = req.body.conf;
                vers.source = req.body.source;
                vers.text = req.body.text;
                vers.imgs = req.body.imgs;
                vers.link_coll = req.body.link_coll;
                vers.created_at = req.body.created_at;
                vers.created_by = req.body.created_by;
                vers.last_mod = Date.now(); // changed to Date.now()
                vers.mod_by = req.body.mod_by;

               
                vers.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({ msg: 'vers frissítve'});
                });
            });
        }
    })

// _____________________________DELETE_____________________________


    .delete(function(req, res) {

         if (!req.isAuthenticated()) {
        res.sendStatus(401);
        }

        else {
            console.log('authenticated: ' + req.user.username);

            Vers.remove({
                _id: req.params.vers_id
            }, 

            function(err, Vers) {
                if (err)
                res.send(err);

                res.json({ message: 'vers törölve' });
            });
        }
});
    
router.get('/', function (req, res, next) {
  res.render('index', {title: ""});
});


/*===================================================================================
|
|
|
|
|
|                                      USER ATUH
|
|
|
|
===================================================================================*/

router.route('/auth')

    // register new user
    .post(function(req, res, next) {
        console.log('registering user');
        Account.register(new Account({ username: req.body.username }), 
            req.body.password, function(err) {
                if (err) {
                    console.log('error while user register!', err);
                    return next(err); 
                }

                console.log('user registered!');
                res.redirect('/');
        });
    });

// aut middleware built in the router
router.get('/users', function(req, res) {
    console.log('/users get authenticating user');

    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    }

    else {
        console.log('authenticated: ' + req.user.username);
    
        Account.find(function(err, data){
            if (err)
                res.send(err);
            res.json(data);
        });
    }   
});



// get user by id
router.route('/users/:user_id')
    .get(function(req, res){

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }

        else {
            Account.findById(req.params.user_id, function(err, user){
                if (err)
                    res.send(err);
                res.json(user);
            });
        }
    })

    .delete(function(req, res) {

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }

        else {
            Account.remove({
                _id: req.params.user_id

            }, 
            function(err, Account) {
                if (err)
                res.send(err);

                res.json({ message: 'felhasználó törölve' });
            });
        }            
});


// authenticate user 
router.post('/login', passport.authenticate('local'), function(req, res) {
  // res.redirect('/');
  console.log('/login post authenticating user');
  res.send(req.user);
  console.log('/login post sent user: ' + req.user.username);
});

router.get('/login', passport.authenticate('local'), function(req, res){
    console.log('/login get authenticating user');
    res.send(req.user);
});


// route to test if the user is logged in or not
 router.get('/loggedin', function(req, res) { 
    console.log('/loggedin get authenticating user');
    res.send(req.isAuthenticated() ? req.user : '0'); 
}); 


// req.logout function to terminate session
router.get('/logout', function(req, res) {
    console.log('/logout get authenticating user');
    req.logout();
    // res.sendStatus(200);
    res.redirect('/');
});

module.exports = router;