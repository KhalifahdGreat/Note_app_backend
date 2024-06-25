import mongoose from "mongoose";

//connect to DB
mongoose
  .connect("mongodb://localhost:27017/note-app")
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log("DB Connection Failed", err);
  });
