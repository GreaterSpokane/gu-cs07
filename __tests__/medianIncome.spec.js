const db = require('./db.spec');
const createMedianIncome = require('../controllers/medianIncome/createMedianIncomeController');
const getMedianIncome = require('../controllers/medianIncome/getMedianIncomeController');
const getManyMedianIncome = require('../controllers/medianIncome/getManyMedianIncomeController');
// const deleteMedianIncome = require('../controllers/medianIncome/deleteMedianIncomeController')
const MedianIncome = require('../models/medianIncome');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Median income database model tests', () => {
    const DATA = {
        'county': 'Spokane',
        'state': 'WA',
        'year': '2022',
        'medianIncome': 15547
    };

    const MASS_DATA_COUNTY = "C1"
    const MASS_DATA_STATE = "WA"
    const YEAR_1 = "2001"
    const YEAR_2 = "2002"
    const YEAR_3 = "2003"
    const MEDIAN_INCOME_1 = 20456
    const MEDIAN_INCOME_2 = 25796
    const MEDIAN_INCOME_3 = 44632
    const MASS_DATA = [
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_1,
            'medianIncome': MEDIAN_INCOME_1
        }),
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_2,
            'medianIncome': MEDIAN_INCOME_2
        }), JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_3,
            'medianIncome': MEDIAN_INCOME_3
        })
    ];

    it('should return true if the newly created object returns a new id', async() => {
        const result = await createMedianIncome(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianIncome
        );
        expect(result.corr_id).not.toEqual(null || undefined);
    });

    it('should return true if new object matches its source obj', async() => {
        const result = await createMedianIncome(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianIncome
        );
        //  Find new entry in db
        const doc = await MedianIncome.findById(result.corr_id);
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
        expect(doc.medianIncome).toEqual(DATA.medianIncome);
    });

    it('should return true if newly created object is successfully retrieved from the database', async() => {
        const inserted = await createMedianIncome(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianIncome
        );
        //  Find new entry in DB with get controller
        const found = await getMedianIncome(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createMedianIncome(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.medianIncome
        );
        //  Find new entry in DB with get controller
        const found = await getMedianIncome(DATA.county, DATA.year);
        expect(inserted).not.toEqual(null || undefined);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.medianIncome).toEqual(DATA.medianIncome);
    });

    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyMedianIncome(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createMedianIncome(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.medianIncome
            );
        }

        const found_data = await getManyMedianIncome(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createMedianIncome(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.medianIncome
            );
        }

        const found_data = await getManyMedianIncome(MASS_DATA_COUNTY, '2001', '2002');
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyMedianIncome("C2", '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    /*
    it('should successfully delete element from database', async() => {
        const inserted = await createLabor(
            DATA.county,
            DATA.state,
            DATA.year,
            Math.random(),
            Math.random()
        );
        //  Find new entry in DB with get controller
        const found = await getLabor(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
        const result = await deleteLabor(inserted.corr_id);
        expect(result.result).toEqual('Success');
        const does_exist = await getLabor(DATA.county, DATA.year);
        assert(does_exist.corr_id).toEqual(null);
    });
    */
});