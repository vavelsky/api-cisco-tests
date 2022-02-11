const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
import { HTMLbodies } from '../../src/HTMLbodies';
use(require('chai-json-schema'))
import { SCHEMAS } from '../../src/schemas';
import { getCaseId } from '../Cases/cases.test';
import { userIdsRands } from '../User/user.test';

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
        let res = await request
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
        let res = await request
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
        let res = await request
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
        let res = await request
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
        let res = await request
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        let randomUserId = userIdsRands(res.body)


        const resp = await request
            .post(`/users/${randomUserId}/cases`)
            .expect(201)
            .send(HTMLbodies.bodyNewCase)
    })
    
    
    it(`Adding notes to an existing case`, async() => {
        let res = await request
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

})