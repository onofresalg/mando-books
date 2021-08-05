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

describe('Test login account', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('Login', async () => {
        const findByEmailMock = sandbox
            .stub(UserRepository.prototype, "findByEmail")
            .withArgs(accountSample.email)
    
        findByEmailMock.returns({...accountSample, id: 1});
        
        const response = await request(api)
            .post('/users/auth')
            .send(accountSample)
            .expect(200);
        
        expect(response.body).toEqual({...accountSample, id: 1});
    });

    it('Login email', async () => {
        const findByEmailMock = sandbox
            .stub(UserRepository.prototype, "findByEmail")
            .withArgs(accountSample.email)
    
        findByEmailMock.returns(null);
        

        const response = await request(api)
            .post('/users/auth')
            .send(accountSample)
            .expect(404);
        
        expect(response.body).toEqual({code: 404, message: "Usuário não encontrado.", "status": "error",});
    });

    it('Login password', async () => {
        const findByEmailMock = sandbox
            .stub(UserRepository.prototype, "findByEmail")
            .withArgs(accountSample.email)
    
        findByEmailMock.returns({...accountSample, id: 1});

        const accountSamplePassword = {
            email: 'onofresalg@outlook.com',
            password: "1234567"
        }

        const response = await request(api)
            .post('/users/auth')
            .send(accountSamplePassword)
            .expect(401);
        
        expect(response.body).toEqual({code: 401, message: "Senha invalida.", "status": "error",});
    });

    it('Login with unexpected error', async () => {
        const findByEmailMock = sandbox
            .stub(UserRepository.prototype, "findByEmail")
            .withArgs(accountSample.email)
    
        findByEmailMock.callsFake(() => {
            throw new Error("Unexpected error");
        });

        const accountSamplePassword = {
            email: 'onofresalg@outlook.com',
            password: "1234567"
        }

        const response = await request(api)
            .post('/users/auth')
            .send(accountSamplePassword)
            .expect(500);

        expect(response.body).toEqual({code: 500, message: "Error Unexpected error", "status": "error",});
    });
    
});