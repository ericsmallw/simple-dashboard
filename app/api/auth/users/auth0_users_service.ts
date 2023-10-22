import {UsersService} from '@/app/api/auth/users/users_service';
import {injectable} from 'tsyringe';

@injectable()
/**
 * @description Auth0 implementation of the users service
 */
export default class Auth0UsersService implements UsersService {
  /**
   * @description Get users
   * @param {number} page
   * @return {Promise<any>}
   */
  async getUsers(page: number): Promise<any> {
    const URI = process.env.AUTH0_AUDIENCE +
      'users?q=identities.connection:"'+
      process.env.AUTH0_CONNECTION +
      '"&search_engine=v3&page=' +
      page + '&include_totals=true';
    const RESPONSE = await fetch(URI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    const RESPONSE_JSON = await RESPONSE.json();
    return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
  }
}
