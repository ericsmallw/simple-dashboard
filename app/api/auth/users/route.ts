/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     description: Get all users from Auth0
 *     responses:
 *       200:
 *         description: OK!
 */

import {container} from 'tsyringe';
import Auth0UsersService from './auth0_users_service';
import UsersBusinessManager from "@/app/api/auth/users/users_business_manager";

container.register('UsersService', Auth0UsersService);

/**
 * Get all users
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const PARSED_URL = new URL(request.url);
  const PAGE = PARSED_URL.searchParams.get('page') || '0';

  const usersBusinessManager = container.resolve(UsersBusinessManager);
  return await usersBusinessManager.getUsers(parseInt(PAGE));
}
