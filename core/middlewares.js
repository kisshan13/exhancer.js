import mongoose from "mongoose";
import {ZodError} from "zod";

import mongoHanlder from "../plugins/errors/mongoose-errors.js"
import zodHandler from "../plugins/errors/zod-error.js"

export function exhancerErrorHandler() {
    let errMessage = "";
    let errStatus = 500;

    return (err, req, res) => {
        if (err instanceof mongoose.mongo.MongoServerError) {
            const {message, status} = mongoHanlder(err);
            errMessage = message
            errStatus = status
        }

        if(err instanceof ZodError) {
            const {message, status} = zodHandler(err);
            errMessage = message
            errStatus = status
        }

        res.status(errStatus || err?.status || 500).send({
            status: errStatus || err?.status || 500,
            message: errMessage || err.message
        })
    }
}
