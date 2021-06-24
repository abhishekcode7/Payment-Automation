const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const fs = require("fs");
const path = require("path")
app.use(fileupload());
app.use(express.static("files"));
app.use(cors());
app.post("/sendFile", function (req, res) {
  const data = req.files.file;
  fs.writeFile(
    __dirname + "/script/data.xlsx",
    data.data,
    "ascii",
    function (err) {
      if (err) return console.log(err);
    }
  );
});

app.get("/runScript", (req, res) => {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["./script/script.py"]);
});

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
