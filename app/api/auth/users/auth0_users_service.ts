import {UsersService} from '@/app/api/auth/users/users_service';
import {injectable} from 'tsyringe';
import moment from 'moment';

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

  /**
   * @description Get number of logged-in users in a date range
   * @param {string} from
   * @param {string} to
   * @return {Promise<any>}
   */
  async getLoggedInUsersInDateRange(from: string, to: string): Promise<any> {
    const URI = process.env.AUTH0_AUDIENCE +
        'users?q=last_login:[' + moment.utc(from).format() +
        ' TO ' + moment.utc(to).format() +
        '] AND identities.connection:"' + process.env.AUTH0_CONNECTION +
        '"&search_engine=v3&include_totals=true';

    const RESPONSE = await fetch(URI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    const RESPONSE_JSON = await RESPONSE.json();

    return Response.json(
        RESPONSE_JSON.total,
        {status: RESPONSE_JSON.statusCode}
    );
  }
}
