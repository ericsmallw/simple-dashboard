import 'reflect-metadata';
import {container} from 'tsyringe';
import Auth0VerifyPasswordService from './../auth0_verify_password_service';

describe('Auth0 Verify Password Service', () => {
    afterAll(() => {
       jest.restoreAllMocks();
    });

    describe('verifyPassword', () => {
        it(`should call fetch`, async () => {
            container.register('VerifyPasswordService', Auth0VerifyPasswordService);
            const verifyPasswordService = container.resolve(Auth0VerifyPasswordService);

            const fetchSpy = jest
                .spyOn(global, 'fetch')
                .mockImplementation((...args: unknown[]): Promise<any> => {
                    return new Promise((resolve, reject) => {
                        resolve(new Response(JSON.stringify({}), { status: 200 }));
                    });
                });

            await verifyPasswordService.verifyPassword({
                password: 'password',
                email: 'email'
            });

            expect(fetchSpy).toBeCalled();
        });
    });
});
