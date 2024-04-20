class baseController {
    sendSuccess(res, data = [], msg, code) {
        const array = {
            'status' : code,
            'message' : msg,
            'data' : data
        }
        res.send(array).status(code)
    }

    sendError(res, data = [], msg, code) {
        const array = {
            'status' : code,
            'message' : msg,
            'data' : data
        }
        res.send(array).status(code)
    }
}

export default baseController