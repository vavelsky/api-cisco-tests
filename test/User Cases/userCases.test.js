const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
import { HTMLbodies } from '../../src/HTMLbodies';
use(require('chai-json-schema'))
import { SCHEMAS } from '../../src/schemas';
import { ERROR_CODE_MEASSAGES, randomHugeCaseId, randomNotExistingUser, STRINGS } from '../../src/strings';
import { userIdsRands } from '../User/user.test';

// I N F O :
// Different approach to gathering cases. Here hapy paths separately from the error paths.

function userIdCaseId(respBody) {
    let usersLen = respBody.length
    let usersIdTab = []
    for ( let i = 0 ; i < usersLen ; i++ ) {
        usersIdTab.push(respBody[i].user.id)
    }
    let rand = Math.floor(Math.random()* usersLen)
    let randUserId = usersIdTab[rand]
    let caseId = respBody[rand].cases[0].id
    return [randUserId, caseId]
}

describe(`Accessing user's cases`, () => {
    it(`Accessing user's cases`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)


        const resp = await request
            .get(`/users/${randomUserId}/cases`)
            .expect(200)
            .expect('Content-Type', /json/)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaCasesUser)
    }),

    it(`Accessing user's OPEN cases`, async() => {
        //TODO: improvement to get list of open cases, store userId to reuse for next call
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)


        const resp = await request
            .get(`/users/${randomUserId}/cases/status/OPEN`)
            .expect(200)
            .expect('Content-Type', /json/)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaUserCasesOpen)
    }),

    it(`Accessing user's CLOSED cases`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)


        const resp = await request
            .get(`/users/${randomUserId}/cases/status/CLOSED`)
            .expect(200)
            .expect('Content-Type', /json/)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaUserCasesClosed)
    })

    it(`Accessing user's case by id`, async() => {
        const res = await request
            .get('/cases/status/OPEN')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let ids = userIdCaseId(res.body)
        let randomUserId = ids[0]
        let randomUserCaseId = ids[1]

        const resp = await request
            .get(`/users/${randomUserId}/cases/${randomUserCaseId}`)
            .expect(200)
            .expect('Content-Type', /json/)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaUserCaseId)


    })

    it(`Creating new case for a user`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)


        const resp = await request
            .post(`/users/${randomUserId}/cases`)
            .send(HTMLbodies.bodyNewCase)
            .expect(201)
    })
    
    
    it(`Adding notes to an existing case`, async() => {
        const res = await request
            .get('/cases/status/OPEN')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let ids = userIdCaseId(res.body)
        let randomUserId = ids[0]
        let randomUserCaseId = ids[1]

        const respo = await request
            .post(`/users/${randomUserId}/cases/${randomUserCaseId}/notes`)
            .send(HTMLbodies.bodyCaseNote)
            .expect(201)
    })
})

describe(`Accessing user's cases - errors`, () => {
    it(`Accessing user's case that doesn't exist`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        const resp = await request
            .get(`/users/${randomUserId}/cases/${randomHugeCaseId}`)
            .expect(404)
            .expect('Content-Type', /json/)
            assert.isNotEmpty(resp.body)
            assert.equal(resp.body.messages[0], STRINGS.caseNotExist, 'Correct error message')
            assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.NF, 'Correct status')
    }),

    it(`Creating case for not existing user`, async() => {
        const resp = await request
            .post(`/users/${randomNotExistingUser}/cases`)
            .send(HTMLbodies.bodyNewCase)
            .expect(404)
            .expect('Content-Type', /json/)
            assert.isNotEmpty(resp.body)
            assert.equal(resp.body.messages[0], STRINGS.userNotExist, 'Correct error message')
            assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.NF, 'Correct status')
    }),

    it(`Adding notes for not existing case of not existing user`, async() => {
        const resp = await request
            .post(`/users/${randomNotExistingUser}/cases/${randomHugeCaseId}/notes`)
            .send(HTMLbodies.bodyCaseNote)
            .expect(404)
            .expect('Content-Type', /json/)
            assert.isNotEmpty(resp.body)
            assert.equal(resp.body.messages[0], STRINGS.caseNotExist, 'Correct error message')
            assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.NF, 'Correct status')
    }),

    it(`Adding notes for not existing case of existing user`, async() => {
        const res = await request
            .get('/cases/status/OPEN')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let userId = userIdCaseId(res.body)
        let randomUserId = userId[0]
        let caseId = userIdCaseId(res.body)
        let randomUserCaseId = caseId[1]

        const resp = await request
            .post(`/users/${randomUserId}/cases/${randomUserCaseId}/notes`)
            .send(HTMLbodies.bodyCaseNote)
            .expect(404)
            .expect('Content-Type', /json/)
            assert.isNotEmpty(resp.body)
            assert.equal(resp.body.messages[0], `Case with id ${randomUserCaseId} not found`, 'Correct error message')
            assert.equal(resp.body.status, ERROR_CODE_MEASSAGES.NF, 'Correct status')
    }),

    it(`Adding case with empty fields for existing user`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        const resp = await request
            .post(`/users/${randomUserId}/cases`)
            .send(HTMLbodies.bodyNewCaseEmptyField)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaCaseRequestEmpty)
    }),

    it(`Adding case without severity for existing user`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        const resp = await request
            .post(`/users/${randomUserId}/cases`)
            .send(HTMLbodies.bodyNewCaseNoSeverity)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaCaseRequestuNoSeverity)
    }),

    it(`Adding case with only notes for existing user`, async() => {
        const res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)

        const resp = await request
            .post(`/users/${randomUserId}/cases`)
            .send(HTMLbodies.bodyNewCaseOnlyNotes)
            .expect(400)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(resp.body)
        expect(resp.body).to.be.jsonSchema(SCHEMAS.schemaCaseRequestEmpty)
    })
})