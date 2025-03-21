const { Router } = require('express');
const router = Router();
const passport = require('../middleware/passport');
const adminAuth = require('../middleware/admin');
const userController = require('../controllers/user.controller');

router.post('/users', adminAuth.authenticate('jwt', { session: false }), userController.create);
router.get('/users', 
    // adminAuth.authenticate('jwt', { session: false }), 
    userController.getAll);
router.post('/register/admin', 
    //  adminAuth.authenticate('jwt', { session: false }), 
     userController.createAdmin);
router.get('/users/:id', adminAuth.authenticate('jwt', { session: false }), userController.getOne);
router.put('/users/:id', adminAuth.authenticate('jwt', { session: false }), userController.update);
router.delete('/users/:id', adminAuth.authenticate('jwt', { session: false }), userController.delete);

module.exports = router;
