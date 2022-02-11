const request = require('supertest')('http://localhost:8080')
import { use, assert, expect } from 'chai';
import { describe } from 'mocha';
use(require('chai-json-schema'))
import { SCHEMAS } from '../../src/schemas';
import { userIdsRands } from '../User/user.test';

export function getCaseId(respBody, casesLen) {
    let randCaseId = Math.floor(Math.random()* casesLen)
    // console.log(`randCaseId: ${respBody}`)
    let caseId = respBody[randCaseId].id
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