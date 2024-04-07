const express = require('express');
const router = express.Router();

const {
    register_post,
    login_post,
    findUser_get,
    allUsers_get,
    currUser_get,
    logout_get,
} = require('../controllers/userController');


router.get('/', allUsers_get);
router.get('/user', currUser_get);
router.post('/register', register_post);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get('/find/:userId', findUser_get);




module.exports = router;