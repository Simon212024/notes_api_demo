import express from "express";

import notesRoute from "./routes/note-routes.js";

const app = express();
const port = 3000;

//Middleware
app.use(express.json());

//Connecting the routes
app.use('/notes',notesRoute);

//Starting the server
app.listen(port,()=>{
    console.log(`Server isrunning on port http://localhost:${port}`);

});