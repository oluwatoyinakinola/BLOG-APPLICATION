const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

 router.get('/signup', userController.getSignup);
 router.post('/accesslogin', userController.accesslogin);
//  router.get('/login', userController.accesslogin);

 router.get('/login', (req, res) => {
     res.render('login');
   });

module.exports = router;
