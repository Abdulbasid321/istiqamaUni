const { Router } = require('express');
const router = Router();
const passport = require('../middleware/passport');
const classController = require('../controllers/class.controller')


router.post('/class',
    //  passport.authenticate('jwt', { session: false }),
      classController.create)
router.get('/class', passport.authenticate('jwt', { session: false }), classController.getAll)
router.get('/class/:id', classController.getOne)
router.put('/users/:id', classController.update)
router.delete('/users/:id', classController.delete)
// get all student base on a particular class
router.get('/class/:classId/users', passport.authenticate('jwt', { session: false }), classController.getAllClassStudent)


module.exports = router;

