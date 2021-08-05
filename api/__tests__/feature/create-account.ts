import request from 'supertest';
import sinon from 'sinon';

import api from './../../src/infrastructure/entrypoint/api';
import UserRepository from '../../src/infrastructure/repositories/local-memory/user.repository';

const sandbox = sinon.createSandbox();

const accountSample = {
    name: 'Onofre Salgueiro',
    email: 'onofresalg@outlook.com',
    password: "12345678"
}

describe('Teste create account', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('Create account if not exists', async () => {
        const findByEmailMock = sandbox
            .stub(UserRepository.prototype, "findByEmail")
            .withArgs(accountSample.email)
    
        findByEmailMock.onCall(0).returns(null);
        findByEmailMock.onCall(1).returns({...accountSample, id: 1});
        
        sandbox
            .stub(UserRepository.prototype, "create")
            .withArgs(accountSample);
        
        const response = await request(api)
            .post('/users/register')
            .send(accountSample)
            .expect(200);
        
        expect(response.body).toEqual({...accountSample, id: 1});
    });
});