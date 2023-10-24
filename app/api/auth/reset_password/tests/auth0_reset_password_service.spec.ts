import 'reflect-metadata';
import Auth0ResetPasswordService from './../auth0_reset_password_service';
import {container} from 'tsyringe';

describe('Auth0ResetPasswordService', () => {
    const auth0ResetPasswordService = container.resolve(Auth0ResetPasswordService);
   describe('resetPassword', () => {
      it('should call fetch with the correct parameters', async () => {
          const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((...args: unknown[]): Promise<any> => {
              return new Promise((resolve, reject) => {
                  resolve(new Response(JSON.stringify({}), {status: 200}));
              });
          });

          await auth0ResetPasswordService.resetPassword({
                oldPassword: 'oldPassword',
                newPassword: 'newPassword',
                newPasswordAgain: 'newPassword',
                userId: 'auth0|123456789'
          });

          expect(fetchSpy).toBeCalled();
      });
   });
});
