import express from "express"
import loader from "../loader.js";
import { exhancerErrorHandler } from "./middlewares.js";

export class Exhancer {

    #directory
    #fsRouting
    #errorHandler
    #prefix

    /**
     *
     * @param config {Object}
     * @param config.fsRouting {boolean}
     * @param config.directory {string}
     * @param config.prefix {string}
     */
    constructor(config) {
        this.app = express();
        this.#fsRouting = config?.fsRouting || false;
        this.#directory = config?.directory;
        this.#prefix = config?.prefix || "/api"
        this.#errorHandler = []
    }

    /**
     * @param handlers {() => {message: string, status: number}}
     * */
    onError(handlers) {
        this.#errorHandler = handlers
    }

    /**
     *
     * @param port {number}
     * @param callback {() => void}
     */
    async run(port, callback) {

        if (this.#fsRouting) {

            try {
                const isLoaded = await loader(this.app, { watch: this.#directory, handlers: this.#errorHandler || [], prefix: this.#prefix })
            }

            catch (e) {
                console.log(`[EXHANCER] ⚠️ Failed to load routes from /${this.#directory} \n ${e} `)
            }
        }

        else {
            if (this.#errorHandler.length) {
                this.app.use(exhancerErrorHandler(this.#errorHandler));
                console.log(`[EXHANCER] ⚠️ Loaded Error Handler`)
            }
        }

        this.app.listen(port, callback)
    }
}

