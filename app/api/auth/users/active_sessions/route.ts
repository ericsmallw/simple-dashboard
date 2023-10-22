/**
 * @swagger
 * /api/auth/users/active_sessions:
 *   get:
 *     description: Gets count of active sessions for a given date range
 *     parameters:
 *     - in: query
 *       name: from
 *       schema:
 *         type: string
 *         format: date
 *         example: 2023-10-01
 *       required: true
 *       description: Start date for the date range
 *     - in: query
 *       name: to
 *       schema:
 *         type: string
 *         format: date
 *         example: 2023-10-31
 *       required: true
 *       description: End date for the date range
 *     responses:
 *       200:
 *         description: OK!
 */

import {container} from 'tsyringe';
import UsersBusinessManager from '@/app/api/auth/users/users_business_manager';
import Auth0UsersService from '@/app/api/auth/users/auth0_users_service';

container.register('UsersService', Auth0UsersService);

/**
 * Gets count of active sessions for a given date range
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const PARSED_URL = new URL(request.url);
  const FROM = PARSED_URL.searchParams.get('from');
  const TO = PARSED_URL.searchParams.get('to');

  if (!FROM || !TO) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
  }

  const usersBusinessManager = container.resolve(UsersBusinessManager);
  return await usersBusinessManager.getLoggedInUsersInDateRange(FROM, TO);
}
