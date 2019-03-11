require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const {
  registerUser,
  loginUser,
  logout,
  getPosts,
  searchPost,
  getPost,
  editPost
} = require("./controller");

const app = express();

app.use(json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected");
});

app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);
app.post("/auth/logout", logout);

app.get("/api/posts", getPosts);
app.get("/api/posts/filter", searchPost);
app.get("/api/post/:id", getPost);
app.put("/api/post/:id/edit", editPost);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
