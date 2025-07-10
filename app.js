const express = require("express");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let items = [];

app.get("/", function (req, res) {
  res.render("list", { ejes: items });
});

app.post("/add", function (req, res) {
  const item = req.body.ele1.trim();
  if (item) items.push(item);
  res.redirect("/");
});

app.delete("/delete", function (req, res) {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) items.splice(index, 1);
  res.redirect("/");
});

app.put("/edit", function (req, res) {
  const index = parseInt(req.body.index);
  const newValue = req.body.newValue.trim();
  if (!isNaN(index) && newValue) items[index] = newValue;
  res.redirect("/");
});

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
