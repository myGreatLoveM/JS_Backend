const constants = require('constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            break
        case constants.UNAUTHORIZED:
            break
        case constants.FORBIDDEN:
            break
        case constants.NOT_FOUND:
            break
        case constants.SERVER_ERROR:
            break
        default:
    }
}

