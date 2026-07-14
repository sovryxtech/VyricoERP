// const express = require("express");
// const router = express.Router();

// const { login, signup } = require("../controllers/user");
// const {restrictToLoggedInUserOnly} = require("../middlewares/user")
// // const { getUser } = require("../services/auth");

// router.post("/login", login);
// router.post("/signup", signup);
// // router.post("/getInfo",);
// router.get("/me", restrictToLoggedInUserOnly, (req, res) => {
//     res.json({ user: req.user });
// });


// module.exports = router


const express = require("express");

const router = express.Router();

const { login, signup } = require("../controllers/user");
const { restrictToLoggedInUserOnly } = require("../middlewares/user");

router.post("/login", login)
router.post("/signup", signup)
router.get("/me", restrictToLoggedInUserOnly, (req, res) => {
    return res.json({ user: req.user })
})

module.exports = router;