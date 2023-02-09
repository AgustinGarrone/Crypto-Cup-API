import  express  from "express";
import "dotenv/config";
import "./src/database/mongoConnect.js";
    
//ImportRoutes
import userRouter from "./src/routes/user.router.js";
import ticketRouter from "./src/routes/tickets.router.js";
import predictionRouter from "./src/routes/predictions.router.js";
import matchRouter from "./src/routes/matches.router.js";
import storeRouter from "./src/routes/store.router.js";
import utilsRouter from "./src/routes/utils.router.js";
import challengeRouter from "./src/routes/challengeRoom.router.js"

//Security/Utils
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import * as deposit from "./src/helpers/deposits.js";

const helloWorld = (req, res) => {
    res.send("Hello World!");
}

const whitelist=[process.env.origin,process.env.origin2, process.env.origin3, process.env.origin4]
const App=express();


App.use(
    cors({
        origin:whitelist,
        credentials:true,
    })
);

App.use(helmet());
App.use(express.json());
App.use(cookieParser());
      

//useRoutes
App.use('/api/V1/user', userRouter);
App.use('/api/V1/tickets', ticketRouter);
App.use('/api/V1/predictions', predictionRouter);
App.use('/api/V1/matches', matchRouter);
App.use('/api/V1/challenge' , challengeRouter)
App.use('/api/V1/store', storeRouter);
App.use('/api/V1/utils', utilsRouter);
App.use('/', helloWorld);


//Server listening...
const PORT = process.env.PORT || 5000;
App.listen(PORT, () => console.log("server running"));