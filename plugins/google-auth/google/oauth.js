import { google } from "googleapis"
import ExhancerGoogleAuthError from "./error.js"

export default class ExhancerGoogleAuth {

    #client
    #allowGenerateUrl
    #app
    /**
     * 
     * @param {import("express").Express} app 
     * @param {Object} config 
     * @param {string} config.clientId 
     * @param {string} config.clientSecret  
     * @param {string} config.redirectUri 
     */
    constructor(app, config) {
        /**
         * @type {import("googleapis").Auth.AuthClient.OAuth2Client}
         */
        this.#client = new google.auth.OAuth2({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            redirectUri: config.redirectUri,
        })

        this.#allowGenerateUrl = false
        /**
         * @type {import("express").Express}
         */
        this.#app = app
    }

    /**
     * @param {string} endpoint
     * @param {(tokenInfo: import("googleapis").Auth.GetTokenOptions) => Object} callback
     * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
     */
    handleAuth(endpoint, callback) {
        return async (req, res, next) => {
            if (req.path === endpoint) {
                if (!req.query?.code) {
                    throw new ExhancerGoogleAuthError("Code missing", 400)
                }

                this.#client.getToken(req.query?.code).then((result) => {
                    const info = callback(result.tokens)

                    res.send(info)


                }).catch((err) => {
                    console.log(err)
                    throw new ExhancerGoogleAuthError(err?.message, 400)
                })

                // console.log(info)

                return

            }
        }
    }
}