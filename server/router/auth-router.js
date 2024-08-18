const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const validate = require('../middlewares/validate-middleware');
const { signupSchema, loginSchema, } = require('../validators/auth-validator');
const authMiddleware = require('../middlewares/auth-middleware');   


// router.get('/',async(req,res)=>{
//     res.send('Hello World using express router')
// })

//! you can also do the "above code" using this way and the code written below is "usually prefered" as you can also do chaining of "http-routes(get,post,put,patch,delete)" in this..

// router.route('/').get((req,res)=>{
//     res.status(200).send('Welcome to Home Page using Express router');
// })

//! now reducing the "above code" using "AuthController"

router.route('/').get(authControllers.home);

// router.route('/register').post(authcontrollers.register);
//^ using middleware to validate zod in this request
router
    .route('/register')
    .post(validate(signupSchema), authControllers.register);

router
    .route('/login')
    .post(validate(loginSchema), authControllers.login);

router.route('/user').get(authMiddleware, authControllers.user);

module.exports = router;