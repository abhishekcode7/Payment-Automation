const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const fs = require("fs");
app.use(fileupload());
app.use(express.static("files"));
// app.use(bodyParser.json({ limit: "10mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true ,parameterLimit: 1000000}));

// router.post("/sendFile", (req, res) => {
//   console.log(req.body);
// });
app.use(cors());
app.post("/sendFile", function (req, res) {
  const data = req.files.file;
  fs.writeFile(__dirname+'/script/data.xlsx',data.data,'ascii', function (err) {
    if (err) return console.log(err);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
