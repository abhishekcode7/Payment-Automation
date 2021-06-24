const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
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
  const data2 = req.files.file2;
  fs.writeFile(
    __dirname + "/script/data2.xlsx",
    data2.data,
    "ascii",
    function (err) {
      if (err) return console.log(err);
    }
  );
  res.send({ code: "Success" });
  return;
});
let pythonProcess = null;
let ended = 1;
app.get("/runScript", (req, res) => {
  const spawn = require("child_process").spawn;
  pythonProcess = spawn("python", ["./script/script.py"]);
  ended = 0;
  // pythonProcess.kill();
  pythonProcess.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
  pythonProcess.on("close", (code) => {
    ended = 1;
    pythonProcess = null;
    res.send({code:"Scripted execution done"});
  });
  // res.send({code:"Scripted execution done"});
});
app.get("/status", (req, res) => {
  if (ended === 0)
    res.send({
      code: "Script is already running , Stop before running again .",
      value: 0,
    });
  else res.send({ value: 1 });
});
app.get("/stopScript", (req, res) => {
  if (pythonProcess != null) {
    pythonProcess.kill();
    res.send({ code: "Script Stopped" });
    pythonProcess = null;
  } else {
    res.send({ code: "Script not running" });
  }
});

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
