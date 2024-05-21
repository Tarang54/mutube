import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // allows only certain origin requests mentioned in env file
    credentials: true,
  })
);

//middleware
app.use(express.json({ limit: "16kb" })); //exp.json used to accept json // good security practice to set limit to accept file in order to protect server from crashing.
//there is issue when data comes from url as enoding is not standardised - for eg - space as %20% and _ and more
app.use(express.urlencoded({extended : true , limit : "16kb"}))
//defines public assets
app.use(express.static("public"))
app.use(cookieParser())




export { app };