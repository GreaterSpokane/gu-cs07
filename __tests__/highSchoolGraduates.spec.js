const db = require('./db.spec');
const createHighSchoolGraduates = require('../controllers/highSchoolGraduates/createHighSchoolGraduatesController');
const getHighSchoolGraduates = require('../controllers/highSchoolGraduates/getHighSchoolGraduatesController');
const getManyHighSchoolGraduates = require('../controllers/highSchoolGraduates/getManyHighSchoolGraduatesController');
const deleteHighSchoolGraduates = require('../controllers/highSchoolGraduates/deleteHighSchoolGraduatesController')
const HighSchoolGraduates = require('../models/highSchoolGraduates');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('High school graduates index database model tests', () => {
    const DATA = {
        'county': 'Spokane',
        'state': 'WA',
        'year': '2019',
        'highSchoolGraduates': .52
    };

    const MASS_DATA_COUNTY = "C1";
    const MASS_DATA_STATE = "WA";
    const YEAR_1 = "2001";
    const YEAR_2 = "2002";
    const YEAR_3 = "2003";
    const HIGH_SCHOOL_GRADUATES_1 = .36;
    const HIGH_SCHOOL_GRADUATES_2 = .36;
    const HIGH_SCHOOL_GRADUATES_3 = .21;
    const MASS_DATA = [JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_1,
            'highSchoolGraduates': HIGH_SCHOOL_GRADUATES_1
        }),
        JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_2,
            'highSchoolGraduates': HIGH_SCHOOL_GRADUATES_2
        }), JSON.stringify({
            'county': MASS_DATA_COUNTY,
            'state': MASS_DATA_STATE,
            'year': YEAR_3,
            'highSchoolGraduates': HIGH_SCHOOL_GRADUATES_3
        })
    ];

    it('should assert creating an object returns a new ObjectId', async() => {
        const result = createHighSchoolGraduates(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.highSchoolGraduates
        );
        //  Assert that an id is returned
        expect((await result).corr_id).not.toEqual(null || undefined);
    });

    it('should assert newly created object\'s id matches source Object', async() => {
        const result = await createHighSchoolGraduates(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.highSchoolGraduates
        );
        //  Find new entry in db
        const doc = await HighSchoolGraduates.findById(result.corr_id)
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
        expect(doc.highSchoolGraduates).toEqual(DATA.highSchoolGraduates);
    });

    it('should assert true if newly created object can be successfully retrieved from the database', async() => {
        const inserted = await createHighSchoolGraduates(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.highSchoolGraduates
        );
        //  Find new entry in db
        const found = await getHighSchoolGraduates(DATA.county, DATA.year);
        expect(inserted.corr_id).toEqual(found.corr_id);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.highSchoolGraduates).toEqual(DATA.highSchoolGraduates);
    });

    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createHighSchoolGraduates(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.highSchoolGraduates
        );
        //  Find new entry in DB with get controller
        const found = await getHighSchoolGraduates(DATA.county, DATA.year);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
        expect(found.highSchoolGraduates).toEqual(DATA.highSchoolGraduates);
    });

    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyHighSchoolGraduates(MASS_DATA_COUNTY, YEAR_1, YEAR_3);
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createHighSchoolGraduates(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.highSchoolGraduates
            );
        }

        const found_data = await getManyHighSchoolGraduates(MASS_DATA_COUNTY, YEAR_1, YEAR_3);
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createHighSchoolGraduates(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.highSchoolGraduates
            );
        }

        const found_data = await getManyHighSchoolGraduates(MASS_DATA_COUNTY, YEAR_1, YEAR_2);
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyHighSchoolGraduates("C2", '2001', '2003');
        expect(found_data.data).toEqual([]);
    });


    it('should successfully delete element from database', async() => {
        const inserted = await createHighSchoolGraduates(
            DATA.county,
            DATA.state,
            DATA.year,
            Math.random()
        );
        //  Find new entry in DB with get controller
        const found = await getHighSchoolGraduates(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
        const result = await deleteHighSchoolGraduates(inserted.corr_id);
        expect(result.result).toEqual('Success');
        const does_exist = await getHighSchoolGraduates(DATA.county, DATA.year);
        expect(does_exist.corr_id).toEqual(null);
    });

    it('should not delete element from database if it does not exist', async() => {
        const result = await deleteHighSchoolGraduates(1);
        expect(result.result).toEqual('Failure');
    });
});