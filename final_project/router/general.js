const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
    if(!isValid(username))  {
        users.push({"username":username, "password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
  } else {
    return res.status(404).json({message: "Unable to register user."});
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    let getPromise = new Promise((resolve,reject) => {
        resolve(books)
    });
    
    getPromise.then((result) => {
        return res.send(result);
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;

    let getPromise = new Promise((resolve,reject) => {
        resolve(books[isbn])
    });

    getPromise.then((result) => {
        return res.send(result);
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    
    let getPromise = new Promise((resolve,reject) => {
        let filtered_books = {};
        let len = Object.keys(books).length;
        for(let i = 1; i <= len; i++) {
            if(books[i].author === author) {
                filtered_books[i] = books[i];
            }
        }
        resolve(filtered_books);
    });
    
    getPromise.then((result) => {
        return res.send(result);
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const title = req.params.title;
    
    let getPromise = new Promise((resolve,reject) => {
        let filtered_books = {};
        let len = Object.keys(books).length;
        for(let i = 1; i <= len; i++) {
            if(books[i].title === title) {
                filtered_books[i] = books[i];
            }
        }
        resolve(filtered_books);
    });
    
    getPromise.then((result) => {
        return res.send(result);
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
