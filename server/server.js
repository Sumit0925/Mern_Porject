require("dotenv").config(); //~ This means we can use "dotenv" and its functionality in this applications

const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

const port = 3000;

//* lets tackle cors
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); //*This is a "middleware" and it ensures that you can use "json" in your application (i.e It "parses" incoming requests bodies with "JSON" Payloads )

//~ Mount the Router: To use the router in your main Express app, you can "mount" it at a specific url prefix
app.use("/api/auth", authRoute);
// app.get('/',async(req,res)=>{
//     res.send('Hello World')
// })
app.use("/api/form", contactRoute);

app.use("/api/data",serviceRoute);


app.use(errorMiddleware); //! Error Middleware

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Sever is running at http://localhost:${port}`);
  });
});
