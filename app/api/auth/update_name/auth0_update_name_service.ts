import {UpdateNameService} from './update_name_service';
import UpdateNameRequest from '@/app/models/update_name_request';
import {injectable} from 'tsyringe';

@injectable()
/**
 * @description Auth0 implementation of the update name service
 */
export default class Auth0UpdateNameService implements UpdateNameService {
  /**
   * @description Update name
   * @param {UpdateNameRequest} request
   * @return {Promise<any>}
   */
  async updateName(request: UpdateNameRequest): Promise<any> {
    console.log(request.userId);
    const URL = `${process.env.AUTH0_AUDIENCE}users/${request.userId}`;
    const RESPONSE = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: request.name,
      }),
    });

    const RESPONSE_JSON = await RESPONSE.json();

    console.log(RESPONSE_JSON);

    return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
  }
}
