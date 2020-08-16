const express = require('express');
const app = express();
const {ROLE, users} = require('./data');
const {authUser, authRole} = require('./basicAuth');
const projectRouter = require('./routes/projects');

app.use(express.json())
app.use(setUser);
app.use('/projects',projectRouter);

app.get('/', (req, res) =>{
  res.send('Home Page');
});

app.get('/dashboard', authUser, (req, res) =>{
  res.send('Dashboard Page');
});

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) =>{
  res.send('Admin page');
});

function setUser(req, res, next){
  const userId = req.body.userId;
  if (userId){
    req.user = getUserById(userId);
  }

  next();
}

function getUserById(id){
  return users.find(user => user.id === id);
}


app.use(function (req, res, next) {
  res.status(404).send("404")
})

app.listen(3000);
