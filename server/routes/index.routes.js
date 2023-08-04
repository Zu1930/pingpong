const router = require('express').Router();

const adminRouter = require('./api/admin.routes')

router.use('/admin', adminRouter)

module.exports = router