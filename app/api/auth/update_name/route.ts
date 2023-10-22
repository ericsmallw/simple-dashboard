/**
 * @swagger
 * /api/auth/update_name:
 *   patch:
 *     description: Update user name in Auth0
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: auth0|6523516e83972709b5769e4e
 *               name:
 *                 type: string
 *                 example: John Doe
 *             required:
 *               - userId
 *               - name
 *     responses:
 *       200:
 *         description: OK!
 */

import 'reflect-metadata';
import {container} from 'tsyringe';
import Auth0UpdateNameService from './auth0_update_name_service';

container.register('UpdateNameService', Auth0UpdateNameService);

/**
 * @description Update user's name in Auth0
 * @param {Request} request
 * @constructor
 */
export async function PATCH(request: Request) {
  const BODY = await request.json();

  if (!BODY.name) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
  }

  const updateNameService = container.resolve(Auth0UpdateNameService);
  return await updateNameService.updateName(BODY);
}


