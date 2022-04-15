const db = require('./db.spec');
const createAverageRent = require('../controllers/averageRent/createAverageRentController');
const getAverageRent = require('../controllers/averageRent/getAverageRentController');
const getManyAverageRent = require('../controllers/averageRent/getManyAverageRentController');
const AverageRent = require('../models/averageRent');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Labor Force database model tests', () => {
    const DATA = {
        'county': 'Spokane',
        'state': 'WA',
        'year': '2022',
        'averageRent': 15547
    };

    const MASS_DATA_COUNTY = "C1"
    const MASS_DATA_STATE = "WA"
    const YEAR_1 = "2001"
    const YEAR_2 = "2002"
    const YEAR_3 = "2003"
    const AVERAGE_RENT_1 = .65
    const AVERAGE_RENT_2 = .40
    const AVERAGE_RENT_3 = .55
    const MASS_DATA = [
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_1,
            'averageRent': AVERAGE_RENT_1
        }),
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_2,
            'averageRent': AVERAGE_RENT_2
        }), JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_3,
            'averageRent': AVERAGE_RENT_3
        })
    ];

    it('should return true if the newly created object returns a new id', async() => {
        const result = await createAverageRent(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.averageRent
        );
        expect(result.corr_id).not.toEqual(null || undefined);
    });

    it('should return true if new object matches its source obj', async() => {
        const result = await createAverageRent(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.averageRent
        );
        //  Find new entry in db
        const doc = await AverageRent.findById(result.corr_id);
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
        expect(doc.averageRent).toEqual(DATA.averageRent);
    });

    it('should return true if newly created object is successfully retrieved from the database', async() => {
        const inserted = await createAverageRent(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.averageRent
        );
        //  Find new entry in DB with get controller
        const found = await getAverageRent(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createAverageRent(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.averageRent
        );
        //  Find new entry in DB with get controller
        const found = await getAverageRent(DATA.county, DATA.year);
        expect(inserted).not.toEqual(null || undefined);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.averageRent).toEqual(DATA.averageRent);
    });

    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyAverageRent(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createAverageRent(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.averageRent
            );
        }

        const found_data = await getManyAverageRent(MASS_DATA_COUNTY, '2001', '2003');
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createAverageRent(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.averageRent
            );
        }

        const found_data = await getManyAverageRent(MASS_DATA_COUNTY, '2001', '2002');
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyAverageRent("C2", '2001', '2003');
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