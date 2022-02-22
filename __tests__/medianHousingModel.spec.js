const db = require('./db.spec');
const createMedianHousing = require('../controllers/medianHousing/createMedianHousingController');
const getMedianHousing = require('../controllers/medianHousing/getMedianHousingController')
const deleteMedianHousing = require('../controllers/medianHousing/deleteMedianHousingController')
const MedianHousingCost = require('../models/medianHousing');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Median housing cost datbase model tests', () => {
    const data = {
        'county': 'Spokane County',
        'state': 'WA',
        'year': '2019',
        'medianHousingCost': 102300
    };

    it('should assert creating an object returns a new ObjectId', async() => {
        const result = createMedianHousing(
            data.county,
            data.state,
            data.year,
            data.medianHousingCost
        );
        //  Assert that an id is returned
        expect((await result).newId).not.toEqual(null || undefined);
    });

    it('should assert newly created object\'s id matches source Object', async() => {
        const result = await createMedianHousing(
            data.county,
            data.state,
            data.year,
            data.medianHousingCost
        );
        //  Find new entry in db
        const doc = await MedianHousingCost.findById(result.newId)
        expect(doc.county).toEqual(data.county);
        expect(doc.state).toEqual(data.state);
        expect(doc.year).toEqual(data.year);
        expect(doc.medianHousingCost).toEqual(data.medianHousingCost);
    });

    it('should assert true if newly created object can be successfully retrieved from the database', async() => {
        const inserted = await createMedianHousing(
            data.county,
            data.state,
            data.year,
            data.medianHousingCost
        );
        //  Find new entry in db
        const found = await getMedianHousing(data.county, data.year);
        expect(inserted.newId).toEqual(found.corr_id)
        expect(found.county).toEqual(data.county);
        expect(found.state).toEqual(data.state)
        expect(found.year).toEqual(data.year)
        expect(found.medianHousingCost).toEqual(data.medianHousingCost)
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createMedianHousing(
            data.county,
            data.state,
            data.year,
            data.medianHousingCost
        );
        //  Find new entry in DB with get controller
        const found = await getMedianHousing(data.county, data.year);
        expect(found.county).toEqual(data.county)
        expect(found.state).toEqual(data.state)
        expect(found.year).toEqual(data.year)
        expect(found.laborForce).toEqual(data.laborForce)
        expect(found.laborParticipationRate).toEqual(data.laborParticipationRate)
    });


    /*
    Todo 
    it('should return if newly created object is successfully deleted from the database', async() => {
        const to_delete = await createMedianHousing(
            data.county,
            data.state,
            data.year,
            data.medianHousingCost
        );
        //  Check object was removed from the database
        const delete_result = await deleteMedianHousing(to_delete.corr_id);
        expect(delete_result.result).toEqual("Success") 
    })
    */
});