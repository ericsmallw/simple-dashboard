import {POST} from './../route';
import ResendEmailBusinessManager from "./../resend_email_business_manager";

describe('ResendEmail Route', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('POST', () => {
       it('should return an error if userId is missing', async () => {
           const result = await POST(new Request('https://example.com/api/auth/resend_verification_email', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({})
           }));

           expect(result).toHaveProperty('status', 400);
       });

       it('should call resendEmailBusinessManager.resendEmail if there is a userId',
           async () => {
           const resendMock = jest.spyOn(ResendEmailBusinessManager.prototype, 'resendEmail').mockImplementation((...args: unknown[]): Promise<any> => {
               return new Promise((resolve, reject) => {
                   resolve(new Response(JSON.stringify({}), {status: 200}));
               });
           });

           await POST(new Request('https://example.com/api/auth/resend_verification_email', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                     userId: 'auth0|123456789'
               })
           }));

           expect(resendMock).toBeCalled();
       });
    });
});
