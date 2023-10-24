import {PATCH} from './../route';
import ResetPasswordBusinessManager from './../reset_password_business_manager';
import VerifyPasswordBusinessManager from './../../verify_password/verify_password_business_manager';

describe('ResetPassword Route', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('PATCH', () => {
        it('should return an error if oldPassword is missing from body', async () => {
            const result = await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: 'newPassword',
                    newPasswordAgain: 'newPassword',
                    userId: 'auth0|123456789',
                    email: 'email@email.com'
                })
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should return an error if newPassword is missing from body', async () => {
            const result = await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: 'oldPassword',
                    newPasswordAgain: 'newPassword',
                    userId: 'auth0|123456789',
                    email: 'email@email.com'
                })
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should return an error if newPasswordAgain is missing from body', async () => {
            const result = await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: 'oldPassword',
                    newPassword: 'newPassword',
                    userId: 'auth0|123456789',
                    email: 'email'
                })
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should return an error if userId is missing from body', async () => {
            const result = await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: 'oldPassword',
                    newPassword: 'newPassword',
                    newPasswordAgain: 'newPassword',
                    email: 'email'
                })
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should return an error if email is missing from body',
            async () => {
            const result = await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: 'oldPassword',
                    newPassword: 'newPassword',
                    newPasswordAgain: 'newPassword',
                    userId: 'auth0|123456789',
                })
            }));

            expect(result).toHaveProperty('status', 400);
        });

        it('should call resetPassword and verifyPassword if all required fields are present',
            async () => {
            const resetPasswordMock = jest.spyOn(ResetPasswordBusinessManager.prototype, 'resetPassword').mockImplementation((...args: unknown[]): Promise<any> => {
                return new Promise((resolve, reject) => {
                    resolve(new Response(JSON.stringify({}), {status: 200}));
                });
            });

            const verifyPasswordMock = jest.spyOn(VerifyPasswordBusinessManager.prototype, 'verifyPassword').mockImplementation((...args: unknown[]): Promise<any> => {
                return new Promise((resolve, reject) => {
                    resolve(new Response(JSON.stringify({}), {status: 200}));
                });
            });

            await PATCH(new Request('https://example.com/api/auth/reset_password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: 'oldPassword',
                    newPassword: 'newPassword',
                    newPasswordAgain: 'newPassword',
                    userId: 'auth0|123456789',
                    email: 'email'
                })
            }));

            expect(resetPasswordMock).toBeCalled();
            expect(verifyPasswordMock).toBeCalled();
        });
    });
});
