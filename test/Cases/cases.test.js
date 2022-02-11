const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
use(require('chai-json-schema'))
import { SCHEMAS } from '../../src/schemas';

function getUserId(respBody) {
    let randUserId = Math.floor(Math.random()* (res.body.length-1))
    let userId = res.body[randUserId].user.id
    return userId
}

function getCaseId(userId) {
    let randUserId = getUserId(respBody)
    let randCaseId = Math.floor(Math.random()* (res.body[0].cases.length-1))
    let caseId = res.body[randUserId].cases[randCaseId].id
    return caseId
}

describe('Accessing cases', () => {
    it('Accessing OPEN cases', async() => {
        const res = await request
            .get('/cases/status/OPEN')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaCasesOpen)
    }),

    it('Accessing CLOSED cases', async() => {
        const res = await request
            .get('/cases/status/CLOSED')
            .expect(200)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaCasesClosed)
    })

    it('Accessing cases without status', async() => {
        const res = await request
            .get('/cases/status/')
            .expect(404)
            .expect('Content-Type', /json/)
        assert.isNotEmpty(res.body)
        expect(res.body).to.be.jsonSchema(SCHEMAS.schemaCasesNoStatus)
    })
})