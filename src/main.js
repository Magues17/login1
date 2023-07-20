let express = require('express');
env = require("dotenv").config();
let PORT = process.env.port || 9012;

let app = express();

app.use(express.json());

let authRouters = require("./routes/authRoutes");
app.use(authRouters);

// let todoRotuers = require('./routes/todoRoutes");
// app.use(todoRoutes);

app.listen(PORT, function(){
    console.log("Application listening on port ", PORT);
});