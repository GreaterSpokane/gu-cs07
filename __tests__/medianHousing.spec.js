const db = require('./db.spec');
const createMedianHousing = require('../controllers/medianHousing/createMedianHousingController');
const getMedianHousing = require('../controllers/medianHousing/getMedianHousingController')
const getManyMedianHousing = require('../controllers/medianHousing/getManyMedianHousingController')
const deleteMedianHousing = require('../controllers/medianHousing/deleteMedianHousingController')
const MedianHousingCost = require('../models/medianHousing');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Median housing cost datbase model tests', () => {
    const DATA = {
        'county': 'Spokane County',
        'state': 'WA',
        'year': '2019',
        'medianHousingCost': 102300
    };

    const MASS_DATA_COUNTY = "C1"
    const MASS_DATA_STATE = "WA"
    const YEAR_1 = "2001"
    const YEAR_2 = "2002"
    const YEAR_3 = "2003"
    const MEDIAN_HOUSING_1 = 258483
    const MEDIAN_HOUSING_2 = 458483
    const MEDIAN_HOUSING_3 = 358483
    const MASS_DATA = [JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_1,
            'medianHousingCost': MEDIAN_HOUSING_1
        }),
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_2,
            'medianHousingCost': MEDIAN_HOUSING_2
        }), JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_3,
            'medianHousingCost': MEDIAN_HOUSING_3
        })
    ]

    it('should assert creating an object returns a new ObjectId', async() => {
        const result = createMedianHousing(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianHousingCost
        );
        //  Assert that an id is returned
        expect((await result).corr_id).not.toEqual(null || undefined);
    });

    it('should assert newly created object\'s id matches source Object', async() => {
        const result = await createMedianHousing(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianHousingCost
        );
        //  Find new entry in db
        const doc = await MedianHousingCost.findById(result.corr_id)
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
        expect(doc.medianHousingCost).toEqual(DATA.medianHousingCost);
    });

    it('should assert true if newly created object can be successfully retrieved from the database', async() => {
        const inserted = await createMedianHousing(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianHousingCost
        );
        //  Find new entry in db
        const found = await getMedianHousing(DATA.county, DATA.year);
        expect(inserted.corr_id).toEqual(found.corr_id)
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state)
        expect(found.year).toEqual(DATA.year)
        expect(found.medianHousingCost).toEqual(DATA.medianHousingCost)
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createMedianHousing(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianHousingCost
        );
        //  Find new entry in DB with get controller
        const found = await getMedianHousing(DATA.county, DATA.year);
        expect(found.county).toEqual(DATA.county)
        expect(found.state).toEqual(DATA.state)
        expect(found.year).toEqual(DATA.year)
        expect(found.laborForce).toEqual(DATA.laborForce)
        expect(found.laborParticipationRate).toEqual(DATA.laborParticipationRate)
    });

    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyMedianHousing(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createMedianHousing(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.medianHousingCost
            );
        }

        const found_data = await getManyMedianHousing(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createMedianHousing(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.medianHousingCost
            );
        }

        const found_data = await getManyMedianHousing(MASS_DATA_COUNTY, '2001', '2002');
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyMedianHousing("C2", '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    /*
    it('should successfully delete element from database', async() => {
        const inserted = await createMedianHousing(
            DATA.county,
            DATA.state,
            DATA.year,
            Math.random()
        );
        //  Find new entry in DB with get controller
        const found = await getMedianHousing(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
        const result = await deleteMedianHousing(inserted.corr_id);
    });
    */
});