import express from "express"
import loader from "../plugins/loader.js";

export class Exhancer {

    #directory
    #fsRouting
    #errorHandler

    /**
     *
     * @param config {Object}
     * @param config.fsRouting {boolean}
     * @param config.directory {string}
     */
    constructor(config) {
        this.app = express();
        this.#fsRouting = config?.fsRouting || false;
        this.#directory = directory;
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
        try {
            const isLoaded = await loader(this.app, { watch: this.#directory, handlers: this.#errorHandler || [], prefix: "/api" })
        }

        catch (e) {
            console.log(e)
            console.log(`[EXHANCER] ⚠️ Failed to load routes from /${this.#directory} \n ${e} `)
        }
    
        this.app.listen(port, callback)
    }
}

