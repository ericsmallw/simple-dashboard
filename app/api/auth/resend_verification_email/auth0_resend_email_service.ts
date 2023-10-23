import 'reflect-metadata';
import {ResendEmailService} from './resend_email_service';
import {injectable} from 'tsyringe';

@injectable()
/**
 * @description Concrete implementation of ResendEmailService which uses Auth0
 */
export default class Auth0ResendEmailService implements ResendEmailService {
  /**
   * @description Resend verification email in Auth0
   * @param {string} userId
   * @return {Promise<any>}
   */
  async resendEmail(userId: string): Promise<any> {
    const DATA = {
      'client_id': process.env.AUTH0_CLIENT_ID,
      'user_id': userId || '',
      'identity': {
        'user_id': userId.replace('auth0|', ''),
        'provider': 'auth0',
      },
    };

    const URL = `${process.env.AUTH0_AUDIENCE}jobs/verification-email`;
    const RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      },
      body: JSON.stringify(DATA),
    });

    const RESPONSE_JSON = await RESPONSE.json();

    return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
  }
}


