const testRoute = require('../routes/testEndpoints');
const httpMocks = require('node-mocks-http');


function isJSONOBject(obj) {
    return obj != undefined && obj != null && obj.constructor == Object;
}

describe('Check website is up', () => {
    //  Test that website it up and running
    test('should return 200', () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: 'http://localhost:3000/data'
        });

        const res = httpMocks.createResponse();
        expect(res.statusCode).toEqual(200);
    })
    test('should return JSON object', () => {
        //  Get heartbeat of server
        var output = testRoute.get('https://localhost:3000/testing/health');
        expect(isJSONOBject(output));
    });
});