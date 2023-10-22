// eslint-disable-next-line valid-jsdoc
/**
 * @swagger
 * /api/auth/reset_password:
 *   patch:
 *     description: Reset user password in Auth0
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: auth0|6523516e83972709b5769e4e
 *               email:
 *                 type: string
 *                 example: eric@joviantechnologies.io
 *                 format: email
 *               oldPassword:
 *                 type: string
 *                 example: Password1!
 *               newPassword:
 *                 type: string
 *                 example: Password2!
 *               newPasswordAgain:
 *                 type: string
 *                 example: Password2!
 *             required:
 *               - userId
 *               - email
 *               - oldPassword
 *               - newPassword
 *               - newPasswordAgain
 *     responses:
 *       200:
 *         description: OK!
 */

import {container} from 'tsyringe';
import ResetPasswordBusinessManager
  from '@/app/api/auth/reset_password/reset_password_business_manager';
import VerifyPasswordBusinessManager
  from '@/app/api/auth/verify_password/verify_password_business_manager';
import Auth0ResetPasswordService from './auth0_reset_password_service';
import Auth0VerifyPasswordService
  from './../verify_password/auth0_verify_password_service';

container.register('ResetPasswordService', Auth0ResetPasswordService);
container.register('VerifyPasswordService', Auth0VerifyPasswordService);

/**
 * @description Reset user password in Auth0
 * @param {Request} request
 * @constructor
 */
export async function PATCH(request: Request) {
  const BODY = await request.json();
  if (
    !BODY.oldPassword ||
    !BODY.newPassword ||
    !BODY.newPasswordAgain ||
    !BODY.userId ||
    !BODY.email
  ) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
  }

  const verifyPasswordBusinessManager =
      container.resolve(VerifyPasswordBusinessManager);

  const VERIFY_RESULT = await verifyPasswordBusinessManager.verifyPassword(
      {email: BODY.email, password: BODY.oldPassword}
  );

  // If the old password is incorrect, return an error
  if (VERIFY_RESULT.error) {
    return Response.json({error: VERIFY_RESULT.error}, {status: 400});
  }

  const resetPasswordBusinessManager =
      container.resolve(ResetPasswordBusinessManager);

  const RESPONSE_JSON =
      await resetPasswordBusinessManager.resetPassword(BODY);

  return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
}


