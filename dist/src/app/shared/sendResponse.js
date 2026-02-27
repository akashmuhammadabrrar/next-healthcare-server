const sendResponse = (res, jsonData) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        statusCode: jsonData.statusCode,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined,
    });
};
export default sendResponse;
