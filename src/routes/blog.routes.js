const { Router } = require('express');
const router = Router();
const passport = require('../middleware/passport');
const blogController = require('../controllers/blog.controller')
const adminAuth = require('../middleware/admin');


router.post('/blog',
    adminAuth.authenticate('jwt', { session: false }),
    blogController.create)
router.get('/blog',
    // adminAuth.authenticate('jwt', { session: false }),
    blogController.getAll)
router.put('/blog/:id',
    // adminAuth.authenticate('jwt', { session: false }),
    blogController.update)
router.delete('/blog/:id',
    // adminAuth.authenticate('jwt', { session: false }),
    blogController.delete)

module.exports = router;

