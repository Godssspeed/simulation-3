module.exports = {
  registerUser: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    db.addUser([username, password]).then(async response => {
      console.log(response.username);
      req.session.user = {
        id: response[0].id,
        username: response[0].username,
        profilePic: response[0].profile_pic
      };
      res.status(200).json(req.session.user);
      console.log(req.session);
    });
  },

  loginUser: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    db.find_user([username, password]).then(async response => {
      if (!response.length) {
        res.status(401).json({ error: "No user found" });
      } else {
        req.session.user = {
          id: response[0].id,
          username: response[0].username,
          profilePic: response[0].profile_pic
        };
        console.log(req.session);
        res.status(200).json(req.session.user);
      }
    });
  },

  logout: (req, res) => {
    const db = req.app.get("db");
    req.session.destroy();
    console.log(req.session);
    res.sendStatus(200);
  },
  getPosts: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.params;
    console.log(req.params);
    db.getPosts().then(response => {
      res.status(200).json(response);
    });
  },
  searchPost: (req, res) => {
    const db = req.app.get("db");
    const { title } = req.query;
    console.log(req.query);
    db.getUserPost(title).then(response => {
      res.status(200).json(response);
    });
  },
  getPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getPost(id).then(response => {
      console.log(response);
      res.status(200).json(response);
    });
  },
  editPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { content } = req.body;
    db.editPost([id, content]).then(response => {
      res.sendStatus(200);
    });
  }
};
