//NPM Dependencies
let express = require("express");
let app = ecpress();

let PORT = process.env.PORT || 8080;

//Express app to handle data parsing
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Refer to routes file
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, function(){
    console.log(`App listening on PORT: ${PORT}`);
});