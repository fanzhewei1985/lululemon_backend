import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import routes from './route/index'


createConnection().then(async connection => {

  
    // create express app
    const app = express();
    app.use(bodyParser.json());

    const cors=require("cors");
    app.use(cors())
    // register express routes from defined application routes
    app.use('/',routes)

    // setup express app here
    // ...

    // start express server
    app.listen(3001);
    console.log(`Express server has started on port 3001. Open http://localhost:3001/users to see results`);

   

}).catch(error => console.log(error));
