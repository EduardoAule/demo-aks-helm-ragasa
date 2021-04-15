const express = require("express");
var multer = require("multer"); //https://www.npmjs.com/package/multer
//The disk storage engine gives you full control on storing files to disk
/*
There are two options available, destination and filename.
They are both functions that determine where the file should be stored.

destination is used to determine within which folder the uploaded files should be stored.
This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given,
the operating system's default directory for temporary files is used.

Note: You are responsible for creating the directory when providing destination as a 
function. When passing a string, multer will make sure that the directory is created for 
you.
filename is used to determine what the file should be named inside the folder. If no 
filename is given, each file will be given a random name that doesn't include any file 
extension.
*/
var local_storage = multer.diskStorage({
  destination: function(req, file, cb) {
	cb(null, "files/");
  },
  filename: function(req, file, cb) {
	cb(null, file.originalname);
  }
});

var upload = multer({ storage: local_storage });

const { ControllerCarga } = require("./controller/controllerCarga");
const con_sta = new ControllerCarga();

// require('dotenv').config();
const { storage } = require('./config');

const app = express();
app.use(express.json());
const port = 3000;
let filepath = __dirname + "/files/" + storage.FILENAME;

/****************************************************************** */
var schedule = require("node-schedule");
// min hr day month day_of_week
var j = schedule.scheduleJob("*/5 * * * *", async function() {
  try {
	console.log("<=== Scheduler Task send Products to Queue RabbitMQ.");
	// let results = await con_sta.cargaProductos(filepath);
	// console-log("===>Task results:", results);
  } catch (e) {
	console.log("e:", e);
  }
});

/****************************************************************** */
app.get("/", async (req, res) => {
  console.log("===>Carga Productos");
  
  res.send({status: "Ok"});
});
app.get("/blobs", async (req, res) => {
  console.log("===>Lista blobs");
  let results = await con_sta.readStorage();
  //results = await con_sta.createSubdir();
  
  res.send(results);
});
  
app.get("/uploadproducts", async (req, res) => {
  console.log("===>Upload Products to Queue RabbitMQ.");
  let results = await con_sta.cargaProductos(filepath);
  res.send(results);
});

app.listen(port, () => console.log(`Services for Carga Productos HEB: ${port}!`));