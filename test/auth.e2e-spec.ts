import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('Authentication System', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', async () => {

        const email = 'test@example.com';
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password: 'test' })
            .expect(201);

        expect(res.body.email).toEqual(email);
        expect(res.body.id).toBeDefined();
    });

    it('signup a new user then get the currently logged in user', async () => {
        const email = 'test@example.com';
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email, password: 'test' })
            .expect(201);
        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/auth/currentuser')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.email).toEqual(email);
    });
});
