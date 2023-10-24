import 'reflect-metadata';
import {container} from "tsyringe";
import Auth0VerifyPasswordService from "./../auth0_verify_password_service";

describe('Verify Password Business Manager', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

   describe('verifyPassword', () => {
       it(`should call verifyPasswordService.verifyPassword`, async () => {
           container.register('VerifyPasswordService', Auth0VerifyPasswordService);

           const verifyPasswordServiceSpy = jest
               .spyOn(Auth0VerifyPasswordService.prototype, 'verifyPassword')
               .mockImplementation((...args: unknown[]): Promise<any> => {
                   return new Promise((resolve, reject) => {
                       resolve(new Response(JSON.stringify({}), {status: 200}));
               });
           });

          const verifyPasswordBusinessManager = container.resolve(Auth0VerifyPasswordService);

          await verifyPasswordBusinessManager.verifyPassword({
              password: 'password',
              email: 'email'
          });

            expect(verifyPasswordServiceSpy).toBeCalled();

       });
   });
});
