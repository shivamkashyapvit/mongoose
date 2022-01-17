const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61dff13b216f57fb0bc07486')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(4300);
// });

mongoose.connect('mongodb+srv://shivamm:shivam1234@cluster0.lkfni.mongodb.net/shops')
.then( result =>{
  User.findOne().then(user => {
    if(!user){
      const user = new User({
     name: 'shivam kashyap',
     email:'shivam123@gmail.com',
     cart:{
       items:[]
     }
   })
   user.save();
    }
     
  })
  
  app.listen(4300)
})
.catch( err => {
  console.log(err)
})