var express = require("express");
var router = express.Router();

var jre = require("node-jre");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("wordfinder");
});

router.post("/upload", function(req, res, next) {
  var dataFromClient = req.body.data;
  console.log(dataFromClient);
  var output = jre.spawnSync([""], "WordFinder", [dataFromClient], {
    encoding: "utf-8"
  }).output[1];

  res.send(output);
});

module.exports = router;
