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

function generateRandomPIN() {
    /** 
     * Return a randomly generated 6-digit pin that the user will enter into the change password screen 
     * to verify the user's identity
     */
    var pin = "";
    var counter = 0;
    while (counter < 6) {
        pin += String(Math.floor(Math.random() * 9) + 1);
        counter++;
    }
    return Number(pin);
}

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

    const DEV_DOMAIN_USER_1 = {
        "username": "zfoteff@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    }

    const DEV_DOMAIN_USER_2 = {
        "username": "labeln@zagmail.gonzaga.edu",
        "unhashedPassword": "testpass"
    }

    const PROD_DOMAIN_USER = {
        "username": "GBallew@greaterspokane.org",
        "unhashedPassword": "testpass"
    }

    const NON_DOMAIN_USER = {
        'username': "test",
        'unhashedPassword': "whyamienteringthisifitsnotgoingtogothrough"
    }

    it('should assert that only users in the proper domains can register an account', async() => {
        const createDevDomainUser = await createAuthUser(DEV_DOMAIN_USER_1.username, DEV_DOMAIN_USER_1.unhashedPassword);
        const createProdDomainUser = await createAuthUser(PROD_DOMAIN_USER.username, PROD_DOMAIN_USER.unhashedPassword);
        const createNonDomainUser = await createAuthUser(NON_DOMAIN_USER.username, NON_DOMAIN_USER.unhashedPassword);
        expect(createDevDomainUser.result).toEqual('registered user');
        expect(createProdDomainUser.result).toEqual('registered user');
        expect(createNonDomainUser.result).toEqual('failed to register user');
    })

    it('should assert that two users with equal passwords have different hashes stored in the db because of the salt', async() => {
        const createUser1 = await createAuthUser(DEV_DOMAIN_USER_1.username, DEV_DOMAIN_USER_1.unhashedPassword);
        const createUser2 = await createAuthUser(DEV_DOMAIN_USER_2.username, DEV_DOMAIN_USER_2.unhashedPassword);
        const dbUser1 = await AuthUser.findOne({ 'username': DEV_DOMAIN_USER_1.username });
        const dbUser2 = await AuthUser.findOne({ 'username': DEV_DOMAIN_USER_2.username });
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
        const createResult = await createAuthUser(AUTHORIZED_USER.username, AUTHORIZED_USER.unhashedPassword);
        const authResult = await authorizeUser(AUTHORIZED_USER.username, AUTHORIZED_USER.unhashedPassword);
        expect(authResult.result).toEqual("success");
    });

    it('should assert that an unregistered user is returned a failure message', async() => {
        const authResult = await authorizeUser(UNAUTHORIZED_USER.username, UNAUTHORIZED_USER.unhashedPassword);
        expect(authResult.result).toEqual("failure");
    })
});

describe('Randomly generated PIN tests', () => {
    it('should return a 6 digit randomly generated integer', async() => {
        const generatedPin = generateRandomPIN();
        var pinString = String(generatedPin);
        expect(generatedPin).not.toEqual(null);
        expect(pinString).not.toEqual("");
        expect(pinString.length).toEqual(6);
    })
})