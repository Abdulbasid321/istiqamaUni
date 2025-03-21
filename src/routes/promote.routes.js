const { Router } = require('express');
const router = Router();
const passport = require('../middleware/passport');
const promoteController = require('../controllers/promote.controller')


router.post('/promote', passport.authenticate('jwt', { session: false }), promoteController.promote);




module.exports = router;
