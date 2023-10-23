import Auth0ResendEmailService
  from '../../auth0_resend_email_service';

describe('Auth0ResendEmailService', () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation((...args: unknown[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      resolve(new Response(JSON.stringify({}), {status: 200}));
    });
  });

  const auth0ResendEmailService = new Auth0ResendEmailService();
  // test resent email function
  it('should resend email', async () => {
    console.log('');
    await auth0ResendEmailService.resendEmail('auth0|123456789');
    expect(fetchSpy).toBeCalled();
  });
});

