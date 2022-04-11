const httpMocks = require('node-mocks-http');

describe('Website routes', () => {
    describe('/ page & resources', () => {
        test('should return 200 for succesfully retrieving / page', () => {
            const req = httpMocks.createRequest({
                method: 'GET',
                url: 'http://localhost:3000/'
            });

            const res = httpMocks.createResponse();
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('/index page & resources', () => {
        test('should return 200 for succesfully retrieving /index page', () => {
            const req = httpMocks.createRequest({
                method: 'GET',
                url: 'http://localhost:3000/index'
            });

            const res = httpMocks.createResponse();
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('/dashboard page & resources', () => {
        test('should return 200 for succesfully retrieving /dashboard page', () => {
            const req = httpMocks.createRequest({
                method: 'GET',
                url: 'http://localhost:3000/dashboard'
            });

            const res = httpMocks.createResponse();
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('/test endpoints', () => {
        test('should return 200 for succesfully retrieving /dashboard page', () => {
            const req = httpMocks.createRequest({
                method: 'GET',
                url: 'http://localhost:3000/health'
            });

            const res = httpMocks.createResponse();
            expect(res.statusCode).toEqual(200);
        });
    });
});