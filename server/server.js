const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
const cloudinary = require('cloudinary');
require('dotenv').config();

// controllers
const authControllers = require('./controllers/auth-controllers');
const postControllers = require('./controllers/post-controllers');
const userControllers = require('./controllers/users-controllers');
const careControllers = require('./controllers/care-controllers');
// const authMiddleware = require('./authMiddleware/authMiddleware');

const app = express();

app.use(bodyParser.json());
// app.use(authMiddleware.bypassAuthInDevelopment);

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));

  cloudinary.config({ 
    cloud_name: process.env.REACT_APP_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

massive(CONNECTION_STRING).then(function(db) {
    app.set("db", db);
    console.log("db is connected");
}).catch(err => {
    console.log(err);
})


// Auth0 authentication code
app.get('/auth/callback', (req, res) => {
    let {REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET} = process.env;
  
    let payload ={
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code", 
      redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    function tradeCodeForAccessToken(){
      return axios.post(`https://${process.env.REACT_APP_DOMAIN}/oauth/token`, payload)
    }

    function tradeAccessTokenForUserInfo(response){
      let token = response.data.access_token;
      return axios.get(`https://${process.env.REACT_APP_DOMAIN}/userinfo/?access_token=${token}`);
    }
    
    

    function storeUserInfoInDataBase(response){
      app.get("db").users.find_user([response.data.sub]).then(user => {
        if(user[0]) {
          req.session.user = user[0];
          return res.redirect('http://localhost:3000/#/forum');
        } else {
          let {given_name: first_name, family_name: last_name, email: username, sub, picture} = response.data;
          app.get("db").users.register_user([first_name, last_name, username, sub, picture]).then(newUser => {
            req.session.user = newUser[0];
            return res.redirect('http://localhost:3000/#/getstarted');
          })
        }
      })   
    }
     
    //Final Code, Uncomment after completeing steps 1-4 above
    
    tradeCodeForAccessToken()
    .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
    .then(userInfo => storeUserInfoInDataBase(userInfo));
    })



// auth controllers
app.post('/api/logout', authControllers.logout);
app.get('/api/user-data', authControllers.userData);
app.get('/api/secure-data', authControllers.checkLoggedIn, authControllers.secureUserData);



// post controllers
app.get('/api/posts', postControllers.getPosts);
app.get('/api/liked/:postid', postControllers.getLikedPosts);
app.put('/api/like/:postid', postControllers.likePost);
app.put('/api/love/:postid', postControllers.lovePost);
app.post('/api/newlike/:postid', postControllers.likeNewPost);
app.get('/api/comments/:postid', postControllers.getComments);
app.post('/api/comment/:postid', postControllers.leaveComment);
app.post('/api/newpost', postControllers.newPost);
app.get('/api/getuserinfo', userControllers.getUserInfo);
app.put('/api/parentinfo', userControllers.updateParentInfo);
app.put('/api/userinfo', userControllers.updateUserInfo);
app.put('/api/familypic', userControllers.updateFamilyMemberPic);


// care providers 
app.get('/api/addresses', careControllers.getAddresses);




app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port: ${SERVER_PORT}`);
})