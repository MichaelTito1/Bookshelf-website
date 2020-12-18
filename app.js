var express = require('express');
var path = require('path');
var app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
let msg = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res){
  res.render('home', {title: "Home page"});
});

app.get('/registration', function(req, res){
  res.render('registration', {title: "registration", msg : msg});
});

app.post('/register', function(req, res){
  let user = req.body.username;
  let pass = req.body.password;
  let msg = add(user, pass);
  if(msg === "User created successfully")
    res.redirect("/"); //something wrong when username already exists [FIXED]
  else res.redirect("/registration");
});

app.get('/', function(req, res){
  res.render('login', {title: "login", msg : msg});
});

app.post('/', function(req,res){
  let user = req.body.username;
  let pass = req.body.password;
  let msg = login(user, pass);
  if(msg === "successful")
    res.redirect('/home');
  else
    res.redirect('/');
  
});

app.get('/readlist', function(req, res){
  res.render('readlist', {title: "Want to Read List"});
});

app.get('/search', function(req, res){
  res.render('searchresults', {title: "Search"});
});

app.get('/novel', function(req, res){
  res.render('novel', {title: "Novel"});
});

app.get('/poetry', function(req, res){
  res.render('poetry', {title: "Poetry"});
});

app.get('/fiction', function(req, res){
  res.render('fiction', {title: "Fiction"});
});

app.get('/flies', function(req, res){
  res.render('flies', {title: "Lord of the Flies"});
});

app.get('/grapes', function(req, res){
  res.render('grapes', {title: "The Grapes of Wrath"});
});

app.get('/leaves', function(req, res){
  res.render('leaves', {title: "Leaves of Grass"});
});

app.get('/sun', function(req, res){
  res.render('sun', {title: "The Sun and her Flowers"});
});

app.get('/dune', function(req, res){
  res.render('dune', {title: "Dune"});
});

app.get('/mockingbird', function(req, res){
  res.render('mockingbird', {title: "To Kill a Mockingbird"});
});

const add = function(user, pass){
  let users = load();
  let found = false;
  
  for(let i = 0; i < users.length && !found; i++){
    if(users[i].username === user)
      found = true;
  }

  if(found){
    console.log("Username already exists.");
    msg = "Username already exists";
  }
  else if(user === ""){
    console.log("No username entered.");
    msg = "Please enter a username";
  }
  else if(pass === ""){
    console.log("No password entered.");
    msg = "Please enter a password";
  }
  else{
    let newUser = {username: user, password:pass};
    users.push(newUser);
    msg = "User created successfully";
  }
  fs.writeFileSync("users.js", JSON.stringify(users));
  return msg;
};

const load = function(){
  try{
    let data = fs.readFileSync("users.js");
    let dataStr = data.toString();
    let arr = JSON.parse(dataStr);
    return arr;
  }
  catch(error){
    return [];
  }
};

const login = function(user, pass){
  let db = load();
  let found = false;

  for(let i = 0; i < db.length && !found; i++){
    if(user === db[i].username && pass === db[i].password)
      found = true;
  }

  if(found){
    console.log("Login successful");
    msg = "successful";
  }
  else{
    console.log("Login unsuccessful");
    msg = "You entered a wrong username or password";
  }
  return msg;
};


if(process.env.PORT){
  app.listen(process.env.PORT, function(){console.log("Server started");});
}
else{
  app.listen(3000, function(){console.log("Server started on port 3000");});
}