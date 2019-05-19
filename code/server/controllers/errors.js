function sendQueryError(response) {
    response.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
}
module.exports = {
    sendQueryError,
};