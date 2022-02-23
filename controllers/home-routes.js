const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get all posts on home 
router.get('/',(req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ], 
        // Recent to latest
        order: [[ 'created_at', 'DESC']],        
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
}).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('post-list', {posts, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// Get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'There are no posts found with this id' });
                return;
            }
            const post = dbPostData.get({  plain: true });
            // Give data to template
            res.render('single-post', {post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get login information and send to login handler
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
});

// Get sign up information and send to signup handler
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });



module.exports = router;
