const db = require('./db.spec');
const createHousingAffordability = require('../controllers/housingAffordability/createHousingAffordabilityController');
const getHousingAffordability = require('../controllers/housingAffordability/getHousingAffordabilityController');
const getManyHousingAffordability = require('../controllers/housingAffordability/getManyHousingAffordabilityController');
const deleteHousingAffordability = require('../controllers/housingAffordability/deleteHousingAffordabilityController')
const HousingAffordabilityIndex = require('../models/housingAffordability');
const res = require('express/lib/response');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Housing affordability index database model tests', () => {
    const DATA = {
        'county': 'Spokane',
        'state': 'WA',
        'year': '2019',
        'housingAffordabilityIndex': 104.1
    };

    const MASS_DATA_COUNTY = "C1";
    const MASS_DATA_STATE = "WA";
    const YEAR_1 = "2001";
    const YEAR_2 = "2002";
    const YEAR_3 = "2003";
    const HOUSING_AFFORDABILITY_1 = 130.6;
    const HOUSING_AFFORDABILITY_2 = 96.6;
    const HOUSING_AFFORDABILITY_3 = 101.1;
    const MASS_DATA = [JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_1,
            'housingAffordabilityIndex': HOUSING_AFFORDABILITY_1
        }),
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_2,
            'housingAffordabilityIndex': HOUSING_AFFORDABILITY_2
        }), JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_3,
            'housingAffordabilityIndex': HOUSING_AFFORDABILITY_3
        })
    ];

    it('should assert creating an object returns a new ObjectId', async() => {
        const result = createHousingAffordability(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.housingAffordabilityIndex
        );
        //  Assert that an id is returned
        expect((await result).corr_id).not.toEqual(null || undefined);
    });

    it('should assert newly created object\'s id matches source Object', async() => {
        const result = await createHousingAffordability(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.housingAffordabilityIndex
        );
        //  Find new entry in db
        const doc = await HousingAffordabilityIndex.findById(result.corr_id)
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
        expect(doc.housingAffordabilityIndex).toEqual(DATA.housingAffordabilityIndex);
    });

    it('should assert true if newly created object can be successfully retrieved from the database', async() => {
        const inserted = await createHousingAffordability(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.housingAffordabilityIndex
        );
        //  Find new entry in db
        const found = await getHousingAffordability(DATA.county, DATA.year);
        expect(inserted.corr_id).toEqual(found.corr_id);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.housingAffordabilityIndex).toEqual(DATA.housingAffordabilityIndex);
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createHousingAffordability(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.housingAffordabilityIndex
        );
        //  Find new entry in DB with get controller
        const found = await getHousingAffordability(DATA.county, DATA.year);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.housingAffordabilityIndex).toEqual(DATA.housingAffordabilityIndex);
    });

    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyHousingAffordability(MASS_DATA_COUNTY, YEAR_1, YEAR_3);
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createHousingAffordability(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.housingAffordabilityIndex
            );
        }

        const found_data = await getManyHousingAffordability(MASS_DATA_COUNTY, YEAR_1, YEAR_3);
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createHousingAffordability(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.housingAffordabilityIndex
            );
        }

        const found_data = await getManyHousingAffordability(MASS_DATA_COUNTY, YEAR_1, YEAR_2);
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyHousingAffordability("C2", '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    
    // it('should successfully delete element from database', async() => {
    //     const inserted = await createHousingAffordability(
    //         DATA.county,
    //         DATA.state,
    //         DATA.year,
    //         DATA.housingAffordabilityIndex
    //     );
    //     //  Find new entry in DB with get controller
    //     const found = await getHousingAffordability(DATA.county, DATA.year);
    //     expect(found.corr_id).toEqual(inserted.corr_id);
    //     const result = await deleteHousingAffordability(inserted.corr_id);
    //     expect(result.result).toEqual("Success");
    // });
    
});