const express = require("express");
const router = express.Router();

router.get("/owner/signup", (req, res) => {
  return res.render("owner/login");
});

module.exports = router;
