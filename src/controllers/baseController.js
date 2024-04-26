class baseController {
    sendSuccess(res, data = [], msg, code, page = 0, totalPage = 0, isIndex = false) {
        const array = {
            'status' : code,
            'message' : msg,
            'data' : data
        }

        if (isIndex) {
            array.current_page = page;
            array.total_page = totalPage;
        }

        res.send(array).status(code);
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