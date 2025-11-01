export class RestHelper {
    test() {
        console.log('Service method test');
    }
    sendSuccess(res, message, mod = 0) {
        res.status(200 + mod);
        res.json(message);
    }
    sendBad(res, message, mod = 0) {
        res.status(400 + mod);
        res.json(message);
    }
    sendError(res, message, mod = 0) {
        res.status(500 + mod);
        res.json(message);
    }
}