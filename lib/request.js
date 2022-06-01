var requestPromise = require("request-promise");
var logger = require('./logger');
module.exports.processRequest =async function(method, url, headers, data, timeout = 30000) {
    try {
        var options = {};
        if (method == "POST" || method == "PUT") {
            options = {
                "method": method,
                "uri": url,
                "json": true,
                "headers": {
                    "authorization": headers.authorization
                },
                "body": data,
                "timeout": timeout
            }

        } else {
            options = {
                "method": method,
                "uri": url,
                "json": true,
                "headers": {
                    "authorization": headers.authorization
                },
                "timeout": timeout
            }
        }
        logger.logFile("request object sent to the server");
        logger.logFile(JSON.stringify(options));
        let result = await requestPromise(options);
        logger.logFile("request object received from the server");
        logger.logFile(JSON.stringify(result));
        return result;
    } catch (error) {
        logger.logFile("exception object received from the server");
        logger.logFile(JSON.stringify(error));
        throw (error);
    }
}
