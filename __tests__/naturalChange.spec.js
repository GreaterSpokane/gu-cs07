const db = require('./db.spec');
const createNaturalChange = require('../controllers/naturalChange/createNaturalChangeController');
const getNaturalChange = require('../controllers/naturalChange/getNaturalChangeController');
const getManyNaturalChange = require('../controllers/naturalChange/getManyNaturalChangeController');
const deleteNaturalChange = require('../controllers/naturalChange/deleteNaturalChangeController');
const NaturalChange = require('../models/naturalChange');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Laborforce Participation Rate database model tests', () => {
    const DATA = {
        'county': 'Spokane County',
        'state': 'WA',
        'year': '2022',
        'naturalChange': 25,
    };

    const DATA_COUNTY = "C1"
    const DATA_STATE = "WA"
    const YEAR_1 = "2001"
    const YEAR_2 = "2002"
    const YEAR_3 = "2003"
    const NATURAL_CHANGE_1 = 258
    const NATURAL_CHANGE_2 = 458
    const NATURAL_CHANGE_3 = 358
    const MASS_DATA = [
        JSON.stringify({
            'county': DATA_COUNTY,
            'state': DATA_STATE,
            'year': YEAR_1,
            'naturalChange': NATURAL_CHANGE_1,
        }),
        JSON.stringify({
            'county': DATA_COUNTY,
            'state': DATA_STATE,
            'year': YEAR_2,
            'naturalChange': NATURAL_CHANGE_2,
        }), JSON.stringify({
            'county': DATA_COUNTY,
            'state': DATA_STATE,
            'year': YEAR_3,
            'naturalChange': NATURAL_CHANGE_3,
        })
    ]

    it('should return true if the newly created object returns a new id', async() => {
        const result = createNaturalChange(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.naturalChange
        );
        expect((await result).corr_id).not.toEqual(null || undefined);
    });

    it('should return true if new object matches its source obj', async() => {
        const result = await createNaturalChange(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.naturalChange
        );
        //  Find new entry in db
        const doc = await NaturalChange.findById(result.corr_id);
        expect(doc.county).toEqual(DATA.county);
        expect(doc.state).toEqual(DATA.state);
        expect(doc.year).toEqual(DATA.year);
    });

    it('should return true if newly created object is successfully retrieved from the database', async() => {
        const inserted = await createNaturalChange(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.naturalChange
        );
        //  Find new entry in DB with get controller
        const found = await getNaturalChange(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
    });
    it('should return true if newly created objects\' data matches the inserted objects\' data', async() => {
        const inserted = await createNaturalChange(
            DATA.county,
            DATA.state,
            DATA.year,
            DATA.naturalChange
        );
        //  Find new entry in DB with get controller
        const found = await getNaturalChange(DATA.county, DATA.year);
        expect(found.corr_id).toEqual(inserted.corr_id);
        expect(found.county).toEqual(DATA.county);
        expect(found.state).toEqual(DATA.state);
        expect(found.year).toEqual(DATA.year);
    });
    it('should return true if a mass retrieval call to an empty database returns an empty dataset', async() => {
        const found_data = await getManyNaturalChange(DATA_COUNTY, '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    it('should return true if a mass retrieval call for a county returns a non-empty data set', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createNaturalChange(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.naturalChange
            );
        }

        const found_data = await getManyNaturalChange(DATA_COUNTY, '2001', '2003');
        expect(found_data.data).not.toEqual([]);
    });

    it('should return true if a mass retrieval call for a county year range excludes the proper number of entries', async() => {
        for (var i = 0; i < MASS_DATA.length; i++) {
            encoded_data = JSON.parse(MASS_DATA[i])
            await createNaturalChange(
                encoded_data.county,
                encoded_data.state,
                encoded_data.year,
                encoded_data.naturalChange
            );
        }

        const found_data = await getManyNaturalChange(DATA_COUNTY, '2001', '2002');
        expect(found_data.data.length).toEqual(2);
    });

    it('should return true if a mass retrieval for a county that does not exist in the database returns nothing', async() => {
        const found_data = await getManyNaturalChange("C2", '2001', '2003');
        expect(found_data.data).toEqual([]);
    });

    /*
    it('should successfully delete element from database', async() => {
        const inserted = await createLabor(
            DATA.county,
            DATA.state,
            DATA.year,
            Math.random(),
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