import 'reflect-metadata';
import {container} from 'tsyringe';
import ResendEmailBusinessManager from './../../resend_email_business_manager';
import Auth0ResendEmailService from './../../auth0_resend_email_service';

describe('ResendEmailBusinessManger', () => {
    container.register('ResendEmailService', Auth0ResendEmailService);
    const resendEmailSpy = jest.spyOn(Auth0ResendEmailService.prototype, 'resendEmail').mockImplementation((...args: unknown[]): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve(new Response(JSON.stringify({}), {status: 200}));
        });
    });

    describe('resendEmail', () => {
       it('should call resendEmailService.resendEmail', async () => {
              const resendEmailBusinessManager = container.resolve(ResendEmailBusinessManager);
              await resendEmailBusinessManager.resendEmail('auth0|123456789');
              expect(resendEmailSpy).toBeCalled();
       })
    });
});
