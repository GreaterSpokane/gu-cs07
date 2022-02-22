const db = require('./db.spec');
const createLabor = require('../controllers/laborParticipation/createLaborController');
const getLabor = require('../controllers/laborParticipation/getLaborController');
const deleteLabor = require('../controllers/laborParticipation/deleteLaborController');
const LaborParticipationRate = require('../models/labor');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Laborforce Participation Rate database model tests', () => {
    const data = {
        'county': 'Spokane County',
        'state': 'WA',
        'year': '2022',
        'laborForce': 258483,
        'laborParticipationRate': 0.615547
    };

    it('should return true if the newly created object returns a new id', async() => {
        const result = createLabor(
            data.county,
            data.state,
            data.year,
            data.laborForce,
            data.laborParticipationRate
        );
        expect((await result).corr_id).not.toEqual(null || undefined);
    });

    it('should return true if new object matches its source obj', async() => {
        const result = await createLabor(
            data.county,
            data.state,
            data.year,
            data.laborForce,
            data.laborParticipationRate
        );
        //  Find new entry in db
        const doc = await LaborParticipationRate.findById(result.corr_id);
        expect(doc.county).toEqual(data.county);
        expect(doc.state).toEqual(data.state);
        expect(doc.year).toEqual(data.year);
        expect(doc.laborForce).toEqual(data.laborForce);
        expect(doc.laborParticipationRate).toEqual(data.laborParticipationRate);
    });

    it('should return true if newly created object is successfully retrieved from the database', async() => {
        const inserted = await createLabor(
            data.county,
            data.state,
            data.year,
            data.laborForce,
            data.laborParticipationRate
        );
        //  Find new entry in DB with get controller
        const found = await getLabor(data.county, data.year);
        expect(found.corr_id).toEqual(inserted.corr_id)
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createLabor(
            data.county,
            data.state,
            data.year,
            data.laborForce,
            data.laborParticipationRate
        );
        //  Find new entry in DB with get controller
        const found = await getLabor(data.county, data.year);
        expect(found.county).toEqual(data.county)
        expect(found.state).toEqual(data.state)
        expect(found.year).toEqual(data.year)
        expect(found.laborForce).toEqual(data.laborForce)
        expect(found.laborParticipationRate).toEqual(data.laborParticipationRate)
    });

    /*
    it('should return if newly created object is successfully deleted from the database', async() => {
        const to_delete = await createLabor(
            data.county,
            data.state,
            data.year,
            data.laborForce,
            data.laborParticipationRate
        );
        //  Get corr_id of new obj
        const delete_result = await deleteLabor(to_delete.corr_id);
        expect(delete_result.result).toEqual("Success")
    })
    */
});