# MVC Tech Blog 

![JavaScript](https://img.shields.io/badge/JavaScript-72.7%20%25-yellow)

![Handlebars](https://img.shields.io/badge/Handlebars-20.4%20%25-orange)

![CSS](https://img.shields.io/badge/CSS-6.9%20%25-purple)

## Description

This project consisted on creating an a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This project follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.This application will be deployed on Heroku.

## Table of Contents

* [Snippets](#snippets)
* [Technologies](#technologies)
* [Preview](#preview)
* [Links](#links)

## Snippets 

* **Get all post from homepage**
```           
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
```   
* **Post model**
```           
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Validate title at least 1 character long
                len: [1]
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Validate post at least 1 character long
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }
```  
* **Delete post form handler**
```           
async function deleteFormHandler(event) {
    event.preventDefault();
    // Get ID
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
```  
## Technologies

* JavaScript
* Inquirer
* Express.js
* Sequelize 
* Handlebars.js
* HTML
* CSS 

## Preview

This is an image of the tech blog application on Heroku.  

![Tech blog app](/public/images/preview.png)

## Links

* [URL of the deployed App in Heroku](https://tech-blog-analu.herokuapp.com/)

* [URL of the GitHub repository](https://github.com/analuciarojas/MVC-Tech-Blog)
