import fs from "fs"
import path from "path"
import {exhancerErrorHandler} from "../core/middlewares.js";
import * as url  from "url";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 *
 * @param app {import("express").application}
 * @param config {Object}
 * @param config.prefix {String}
 * @returns {Promise<boolean>}
 */
async function loader(app, config) {
    const routesPath = path.resolve(__dirname, prefix)
    const routes = await fs.readdirSync(routesPath);

    routes.forEach(async (file, i) => {
        const filePath = path.resolve(routesPath, file, "index.js");
        const loaderFn = await import("file:///" + filePath)

        app.use(`${prefix}/${file}`, loaderFn.default())
        console.log(`[EXHANCER] ⚡ Loaded "${prefix}/${file}" `)

        if(routes?.length === i + 1) {
            app.use(exhancerErrorHandler());
            console.log(`[EXHANCER] ⚡ Loaded Error Handler `)
        }
    })

    return true;
}

export default loader;
