/**
 * @swagger
 * /api/auth/resend_verification_email:
 *   post:
 *     description: Resend verification email in Auth0
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: auth0|6523516e83972709b5769e4e
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: OK!
 */

import 'reflect-metadata';
import {container} from 'tsyringe';
import ResendEmailBusinessManager from './resend_email_business_manager';
import Auth0ResendEmailService from './auth0_resend_email_service';

container.register('ResendEmailService', Auth0ResendEmailService);

/**
 * Resend verification email in Auth0
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  const BODY = await request.json();

  if (!BODY.userId) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
  }

  const resendEmailBusinessManager =
      container.resolve(ResendEmailBusinessManager);

  return resendEmailBusinessManager.resendEmail(BODY.userId);
}

