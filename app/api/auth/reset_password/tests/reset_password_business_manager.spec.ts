import 'reflect-metadata';
import {container} from "tsyringe";
import ResetPasswordBusinessManager from "./../reset_password_business_manager";
import Auth0ResetPasswordService from "./../auth0_reset_password_service";
import {expect} from "@jest/globals";

describe('ResetPasswordBusinessManager', () => {
    container.register('ResetPasswordService', Auth0ResetPasswordService);
    const resetPasswordBusinessManager = container.resolve(ResetPasswordBusinessManager);

    afterAll(() => {
        jest.restoreAllMocks();
    })

    describe('verifyPassword', () => {
        it('should return an error if newPassword and newPasswordAgain do not match',
            async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'newPassword21!',
                newPasswordAgain: 'newPasswordAgain1!',
                userId: 'auth0|123456789'
            })

            expect(errors.length).toBe(1);
        });

        it('should return an error if newPassword is less than 8 characters', async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'newP!1',
                newPasswordAgain: 'newP!1',
                userId: 'auth0|123456789'
            });
            expect(errors.length).toBe(1);
        });

        it('should return an error if newPassword does not contain a number', async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'newPassword!',
                newPasswordAgain: 'newPassword!',
                userId: 'auth0|123456789'
            });

            expect(errors.length).toBe(1);
        });

        it('should return an error if newPassword does not contain an uppercase letter',
            async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'newpassword2!',
                newPasswordAgain: 'newpassword2!',
                userId: 'auth0|123456789'
            });

            expect(errors.length).toBe(1);
        });

        it('should return an error if there are no lowercase letters in newPassword',
            async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'NEWPASSWORD2!',
                newPasswordAgain: 'NEWPASSWORD2!',
                userId: 'auth0|123456789'
            });

            expect(errors.length).toBe(1);
        });

        it('should return an empty array if newPassword and newPasswordAgain match, ' +
            'newPassword is at least 8 characters long, ' +
            'newPassword contains a number, ' +
            'and newPassword contains an uppercase letter', async () => {
            const errors = resetPasswordBusinessManager.verifyRequest({
                oldPassword: 'oldPassword21!',
                newPassword: 'newPassword2!',
                newPasswordAgain: 'newPassword2!',
                userId: 'auth0|123456789'
            });

            expect(errors.length).toBe(0);
        });
    });

    describe('resetPassword', () => {
       it('should call verifyRequest and resetPassword', async () => {
           const verifyRequestSpy = jest
               .spyOn(resetPasswordBusinessManager, 'verifyRequest')
               .mockImplementation((...args: unknown[]): string[] => {
                   return [];
           });

           const resetPasswordSpy = jest.spyOn(Auth0ResetPasswordService.prototype, 'resetPassword').mockImplementation((...args: unknown[]): Promise<any> => {``
                return new Promise((resolve, reject) => {
                    resolve(new Response(JSON.stringify({}), {status: 200}));
                });
              });

          await resetPasswordBusinessManager.resetPassword({
                oldPassword: 'oldPassword21!',
                newPassword: 'newPassword2!',
                newPasswordAgain: 'newPassword2!',
                userId: 'auth0|123456789'
          });

            expect(verifyRequestSpy).toBeCalled();
            expect(resetPasswordSpy).toBeCalled();
       });
    });
});
