const router = require('express').Router();

// User post and comment routes 
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// Route path for api
router.use('/user', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;