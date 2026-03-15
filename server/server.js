const db = require("./db")
const multer = require("multer")
const express = require("express");
const path = require("path");
const propertyRoutes = require("./routes/properties")   

const app = express();

app.use(express.json())

const publicPath = path.join(__dirname, "..", "public");

console.log("Serving static from:", publicPath);

app.use(express.static(publicPath));
app.use("/api/properties", propertyRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:3000");
});

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null, "public/uploads/")
},

filename: function(req,file,cb){
cb(null, Date.now() + "-" + file.originalname)
}

})

const upload = multer({storage})