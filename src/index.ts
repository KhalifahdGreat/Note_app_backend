import express from "express";
import "./db";
import cors from "cors";
import noteRouter from "../src/router/note";

//create server

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(noteRouter);

//listen to port
app.listen(8000, () => {
  console.log("listening");
});
