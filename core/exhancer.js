import express from "express"
import loader from "../plugins/loader.js";

export class Exhancer {

    #directory
    #fsRouting

    /**
     *
     * @param config {Object}
     * @param config.fsRouting {boolean}
     * @param config.directory {string}
     */
    constructor({fsRouting = false, directory= "src"}) {
        this.app = express();
        this.#fsRouting = fsRouting;
        this.#directory = directory;
    }

    /**
     *
     * @param port {number}
     * @param callback {() => void}
     */
    async run(port, callback) {
        try {
            await loader(this.app, {prefix: this.directory})
        }
        
        catch (e) {
            console.log(`[EXHANCER] ⚠️ Failed to load routes from /${this.#directory} \n ${e} `)
        }
        finally {
            this.app.listen(port, callback)
        }
    }
}

