export class RestHelper {
    test() {
        console.log('Service method test');
    }

    fromAuthResStatus(authRes) {
        return (authRes.status === 'SUCCESS') ? 200
            : ((authRes.status === 'ERROR') ? 400 : 500);
    }

    sendAuth(res, authRes, message, status = null) {
        res.status(status || this.fromAuthResStatus(authRes));
        message.response = authRes;
        res.json(message);
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