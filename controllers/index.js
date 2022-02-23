// Gathering routes to export to server 
const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');

// Define paths 
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;