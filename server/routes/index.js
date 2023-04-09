const express = require("express");
// import AuthRouter from "./AuthRouter.js";
const AuthRouter = require("./Auth.router.js");
const router = express.Router();

router.use("/auth", AuthRouter);
// router.use('/user', UserRouter);
// router.use('/post', PostRouter);
// router.use('/comment', CommentRouter);

module.exports = router;
