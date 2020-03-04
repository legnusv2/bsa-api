const handleNotFound = async (req, res, next) => {
    return res.status(404)
        .json({
            message: 'URL not found'
        });
}

const handleServerError = async (error, req, res, next) => {
    return res.status(500)
        .json({
            message: 'Internal server error',
        });
}


module.exports = {
    handleNotFound,
    handleServerError,
}
