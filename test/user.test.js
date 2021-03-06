const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
use(require('chai-json-schema'))
import { SCHEMAS } from '../src/schemas';
import { HTMLbodies } from '../src/HTMLbodies';
import { ERROR_CODE_MEASSAGES, randomNotExistingUser, STRINGS } from '../src/strings';

// I N F O :
// Happy paths mixed with error paths in one set.
// Two sets, one for accessing user and the errors, second one creating users and errors.

export function userIdsRands(respBody) {
    let tableLength = respBody.length;
    let tableIds = [];
    for (let i = 0; i < tableLength; i++) {
        tableIds.push(respBody[i].id)
    }
    let rand = Math.floor(Math.random()* tableLength)
    let randId = tableIds[rand]
    return randId
}

describe ('Accessing users', () => {
    it(`Accessing users' list`, async () => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaUsers)
    }),

    it(`Accessing users list with '/' at the end`, async () => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaUsers);
    }),

    it(`Accessing user's details by id`, async () => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        const resp = await request
            .get(`/users/${randomUserId}`)
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaUser)
    }),

    it(`Accessing user's details that doesn't exist`, async () => {
        const resp = await request
            .get(`/users/${randomNotExistingUser}`)
            .expect(404)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], STRINGS.userNotExist, 'Correct error message')
        assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.NF, 'Correct status')
    })
})

describe('Creating user', () => {
    it(`ACreating new user`, async () => {
        const res = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserOK)
            .expect(201)
            .expect('Content-Length', '0')
        assert.isEmpty(res.body)
    }),

    it('Creating user without email', async () => {
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoEmail)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], STRINGS.emailNotBlank)
        assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.BR, 'Correct status')
    }),

    it('Creating user with email already in db', async () => {
        // TODO: improvement to get the list of email, store it and attempt to reuse it
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserExistingEmail)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], STRINGS.userAlreadyExist)
        assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.BR, 'Correct status')
    }),

    it('PCreating user without firstName', async () => {
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoFirst)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], STRINGS.firstNameNotBlank)
        assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.BR, 'Correct status')
    }),

    it('PCreating user without lastName', async () => {
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoLast)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], STRINGS.lastNameNotBlank)
        assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.BR, 'Correct status')
    }),

    it.skip('Creating user without body object', async () => {
        const resp = await request
            .post('/users')
            .expect(400)
        assert.isEmpty(resp.body)
    }),

    it('Creating user with body object empty', async () => {
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyEmpty)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaNewUserEmptyBody)
    }),

    it('Creating user with empty strings', async () => {
        const resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserEmptyStrings)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaNewUserEmptyBody)
    })
})