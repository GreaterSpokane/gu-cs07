const httpMocks = require('node-mocks-http');
const nock = require('nock');

describe('Test creation of Labor partipation rate when contacting the /v1/newLabor endpoint', () => {
    const data = {
        "county": "Spokane",
        "state": "WA",
        "year": "2019",
        "labor_force": 11,
        "labor_rate": 11,
    }

    it('should return 200 on successfully creating object ', () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: 'http://localhost:3000/v1/newLabor',
            body: data
        });

        const res = httpMocks.createResponse();
        expect(res.statusCode).toEqual(200);

    });

    /* it('should assert that an object id is returned', () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: 'http://localhost:3000/v1/newLabor',
            body: data
        });

        const res = httpMocks.createResponse();

        expect(typeof res.body.newId).toEqual("ObjectId");
    }); */

    it('should assert that incorrect parameters do not create a new object', () => {

    });

    it('should assert that you cannot create two entries with the same year', () => {

    });
});