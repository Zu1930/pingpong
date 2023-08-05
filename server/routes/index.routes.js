const router = require('express').Router();

const adminRouter = require('./api/admin.routes');
const gamerRouter = require('./api/gamer.routes');

router.use('/admin', adminRouter);
router.use('/gamers', gamerRouter);

module.exports = router;
