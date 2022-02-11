const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
use(require('chai-json-schema'))
import { SCHEMAS } from '../../src/schemas';
import { HTMLbodies } from '../../src/HTMLbodies';


function userIdsRands(respBody) {
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
    it('GET /users', async () => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaUsers)
    })

    it('GET /users/', async () => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaUsers);
    })

    it('GET /users/{id}', async () => {
        let res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        let resp = await request
            .get(`/users/${randomUserId}`)
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaUser)
    })

    it('GET /users/{id_not_existing}', async () => {
        let resp = await request
            .get('/users/0')
            .expect(404)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], 'User with id 0 does not exist', 'Correct error message')
        assert.equal(resp.body.status, 'NOT_FOUND', 'Correct status')
    })
})

describe('Creating user', () => {
    it('POST /users', async () => {
        let res = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserOK)
            .expect(201)
            .expect('Content-Length', '0')
        assert.isEmpty(res.body)
    })

    it('POST /users without email', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoEmail)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], 'email - must not be blank')
        assert.equal(resp.body.status, 'BAD_REQUEST', 'Correct status')
    })

    it('POST /users with email already in db', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserExistingEmail)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], "User with email 'maria.garcia@domain.com' already exists.")
        assert.equal(resp.body.status, 'BAD_REQUEST', 'Correct status')
    })

    it('POST /users without firstName', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoFirst)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], "firstName - must not be blank")
        assert.equal(resp.body.status, 'BAD_REQUEST', 'Correct status')
    })

    it('POST /users without lastName', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserNoLast)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        assert.equal(resp.body.messages[0], "lastName - must not be blank")
        assert.equal(resp.body.status, 'BAD_REQUEST', 'Correct status')
    })

    it('POST /users without body', async () => {
        let resp = await request
            .post('/users')
            .expect(400)
        assert.isEmpty(resp.body)
    })

    it('POST /users with body object empty', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyEmpty)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaNewUserEmptyBody)
    })

    it('POST /users with empty strings', async () => {
        let resp = await request
            .post('/users')
            .send(HTMLbodies.bodyNewUserEmptyStrings)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaNewUserEmptyBody)
    })
})