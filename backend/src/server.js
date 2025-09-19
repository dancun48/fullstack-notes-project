// package imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

// local imports
import router from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware - a function that runs between the request and the response
if(process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }));    // allows all/specified origins to access this backend

}
app.use(express.json());    // parses the JSON bodies: req.body
app.use(rateLimiter);   // will limit the number of requests made to the server to 100 per 60 seconds


app.use("/api/notes", router);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})
}


// ENDPOINT - is a combination of a URL+HTTP method that lets the client interact with a specific resource

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    });
});

