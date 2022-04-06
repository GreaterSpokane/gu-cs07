require('dotenv').config();
const db = require('./db.spec');
const AuthUser = require("../models/authUser");
const getUserSalt = require('../controllers/auth/getUserSaltController');
const authorizeUser = require("../controllers/auth/authorizeUserController");
const createAuthUser = require('../controllers/auth/createAuthUserController');

//  Database mock setup
beforeAll(async() => await db.connect());
afterEach(async() => await db.clearDatabase());
afterAll(async() => await db.closeDatabase());

describe('Auth user model tests', () => {
    const USER_DATA = {
        "username": "zfoteff@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    }

    it('should return true if a newly created object returns a success message and has and entry in the db', async() => {
        const result = await createAuthUser(USER_DATA.username, USER_DATA.unhashedPassword);
        const dbEntry = await AuthUser.findOne({ 'username': USER_DATA.username });
        expect(result).not.toEqual(null || undefined);
        expect(dbEntry).not.toEqual(null || undefined);
        expect(result.result).toEqual('registered user');
    });

    it("should return true if a user's salt can be retrieved from the database", async() => {
        const createResult = await createAuthUser(USER_DATA.username, USER_DATA.unhashedPassword);
        const getSaltResult = await getUserSalt(USER_DATA.username);
        const dbEntrySalt = await AuthUser.findOne({ 'username': USER_DATA.username });
        expect(createResult.username).toEqual(USER_DATA.username);
        expect(getSaltResult).not.toEqual(null || undefined);
        expect(getSaltResult.result).toEqual(null || undefined);
        expect(getSaltResult.salt).toEqual(dbEntrySalt.salt);
    })
});

describe('Register user tests', () => {

    const DOMAIN_USER_1 = {
        "username": "zfoteff@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    }

    const DOMAIN_USER_2 = {
        "username": "zfoteff1@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    }

    const NON_DOMAIN_USER = {
        'username': "test",
        'unhashedPassword': "whyamienteringthisifitsnotgoingtogothrough"
    }

    it('should assert that only users in the proper domains can register an account', async() => {
        const createDomainUser = await createAuthUser(DOMAIN_USER_1.username, DOMAIN_USER_1.unhashedPassword);
        const createNonDomainUser = await createAuthUser(NON_DOMAIN_USER.username, NON_DOMAIN_USER.unhashedPassword);
        expect(createDomainUser.result).toEqual('registered user');
        expect(createNonDomainUser.result).toEqual('failed to register user');
    })

    it('should assert that two users with equal passwords have different hashes stored in the db because of the salt', async() => {
        const createUser1 = await createAuthUser(DOMAIN_USER_1.username, DOMAIN_USER_1.unhashedPassword);
        const createUser2 = await createAuthUser(DOMAIN_USER_2.username, DOMAIN_USER_2.unhashedPassword);
        const dbUser1 = await AuthUser.findOne({ 'username': DOMAIN_USER_1.username });
        const dbUser2 = await AuthUser.findOne({ 'username': DOMAIN_USER_2.username });
        expect(dbUser1.username).toEqual(createUser1.username);
        expect(dbUser2.username).toEqual(createUser2.username);
        expect(dbUser1.username).not.toEqual(dbUser2.username);
        expect(dbUser1.password).not.toEqual(dbUser2.password);
    });

});

describe('Authorize user tests', () => {

    const AUTHORIZED_USER = {
        "username": "zfoteff@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    };

    const UNAUTHORIZED_USER = {
        "username": "zfoteff@protonmail.com",
        "unhashedPassword": "passtest"
    };

    it('should assert that a registered user is returned a success message', async() => {

    });

    it('should assert that an unregistered user is returned a failure message', au)

    it('should assert that a registered user can be successfully authorized and redirected to the auth page', async() => {

    });

    it('should assert that an unregistered user will be redirected back to the login page', async() => {

    });
});