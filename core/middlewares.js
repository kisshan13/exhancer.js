export function exhancerErrorHandler(handler) {
    let errMessage = "";
    let errStatus = 0;

    console.log(handler.length)
    
    return (err, req, res, next) => {
        for (let i = 0; i < handler?.length; i++) {
            const result = handler[i]?.default(err);

            if (result?.message || result?.status) {
                errMessage = result?.message
                errStatus = result?.status
                break;
            }
        }

        res.status(errStatus || err?.status || 500).send({
            status: errStatus || err?.status || 500,
            message: errMessage || err.message
        })
    }
}
