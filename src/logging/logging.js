const winston = require("winston");
require("winston-daily-rotate-file");

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        (info) => `${info.timestamp} - [${info.level}] - ${info.message}`
    )
);

const transport = new winston.transports.DailyRotateFile({
    filename: ".//logs//INFORMATION-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "28",
    level: "info"
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({
            level: "info"
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: ".//logs//EXCEPTION-%DATE%.log"
        })
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: ".//logs//REJECTION-%DATE%.log"
        })
    ]
});

module.exports = logger;
