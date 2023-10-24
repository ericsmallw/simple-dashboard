import {ResetPasswordService} from './reset_password_service';
import {injectable} from 'tsyringe';
import ResetPasswordRequest from '@/app/models/reset_password_request';

@injectable()
/**
 * @description Auth0 implementation of ResetPasswordService
 */
export default class Auth0ResetPasswordService implements ResetPasswordService {
  /**
   * @description Reset password in Auth0
   * @param {ResetPasswordRequest} request
   * @return {Promise<any>}
   **/
  async resetPassword(request: ResetPasswordRequest): Promise<any> {
    const URL = `${process.env.AUTH0_AUDIENCE}users/${request.userId}`;

    const RESPONSE = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        password: request.newPassword,
        connection: 'Simple-Dashboard-Connection',
      }),
    });

    return await RESPONSE.json();
  }
}
