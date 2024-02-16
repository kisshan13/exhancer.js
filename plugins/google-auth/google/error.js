export default class ExhancerGoogleAuthError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}