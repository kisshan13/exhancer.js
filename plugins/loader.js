import fs from "fs"
import path from "path"
import { exhancerErrorHandler } from "./core/middlewares.js";
import * as url from "url";

/**
 *
 * @param app {import("express").application}
 * @param config {Object}
 * @param config.prefix {string}
 * @param config.handlers {() => {message: string, status: number }[]}
 * @param config.watch {string}
 * @returns {Promise<boolean>}
 */
async function loader(app, config) {

    const routes = await fs.readdirSync(config.watch);

    routes.forEach(async (file, i) => {
        const filePath = path.resolve(config.watch, file, "index.js");
        const loaderFn = await import("file:///" + filePath)

        app.use(`${config.prefix}/${file}`, loaderFn.default())
        console.log(`[EXHANCER] ⚡ Loaded "${config.prefix}/${file}" `)

        if (routes?.length === i + 1 && config.handlers?.length) {
            app.use(exhancerErrorHandler(config.handlers));
            console.log(`[EXHANCER] ⚡ Loaded Error Handler `)
        }
    })

    return true;
}

export default loader;
