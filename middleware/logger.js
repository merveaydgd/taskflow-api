const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ➡️  ${req.method} İsteği: ${req.originalUrl}`);
    next();
};

module.exports = logger;