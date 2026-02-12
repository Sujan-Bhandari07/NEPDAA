const success = (res, message, data) => {
    if (!data) {
        return res.status(200).json({
            success: true,
            message
        });
    }
    else {
        return res.status(200).json({
            success: true,
            message,
            payload: data
        });
    }
};
const err = (res, message) => {
    return res.status(400).json({
        success: false,
        message
    });
};
export { success, err };
//# sourceMappingURL=response.js.map