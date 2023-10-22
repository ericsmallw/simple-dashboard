import {VerifyPasswordService} from './verify_password_service';
import VerifyPasswordRequest from '@/app/models/verify_password_request';

/**
 * @description Auth0 verify password service
 * @implements {VerifyPasswordService}
 */
export default
class Auth0VerifyPasswordService implements VerifyPasswordService {
  /**
   * @description Verify password
   * @param {VerifyPasswordRequest} request
   * @return {Promise<any>}
   **/
  async verifyPassword(request: VerifyPasswordRequest): Promise<any> {
    console.log('*****3');
    const URL = `${process.env.AUTH0_DOMAIN}oauth/token`;
    const PASS_RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: request.email,
        password: request.password,
        audience: process.env.AUTH0_AUDIENCE,
        scope: 'openid profile email',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
    });

    return await PASS_RESPONSE.json();
  }
}
