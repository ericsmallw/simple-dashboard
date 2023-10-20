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

  const ERRORS: string[] = [];

  if (BODY.newPassword !== BODY.newPasswordAgain) {
    ERRORS.push('New passwords do not match');
  }

  if (BODY.newPassword.length < 8) {
    ERRORS.push('New password must be at least 8 characters long');
  }

  if (!/\d/.test(BODY.newPassword)) {
    ERRORS.push('New password must contain at least 1 number');
  }

  if (!/[A-Z]/.test(BODY.newPassword)) {
    ERRORS.push('New password must contain at least 1 uppercase letter');
  }

  if (!/[a-z]/.test(BODY.newPassword)) {
    ERRORS.push('New password must contain at least 1 lowercase letter');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(BODY.newPassword)) {
    ERRORS.push('New password must contain at least 1 special character');
  }

  if (ERRORS.length > 0) {
    return Response.json({error: ERRORS}, {status: 400});
  }

  const PASS_RESPONSE = await fetch(`${process.env.AUTH0_DOMAIN}oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'password',
      username: BODY.email,
      password: BODY.oldPassword,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
    }),
  });

  const PASS_RES_BODY = await PASS_RESPONSE.json();

  if (PASS_RES_BODY.error) {
    return Response.json(PASS_RES_BODY, {status: PASS_RES_BODY.statusCode});
  }

  const URL = `${process.env.AUTH0_AUDIENCE}users/${BODY.userId}`;
  const RESPONSE = await fetch(URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      password: BODY.newPassword,
      connection: 'Simple-Dashboard-Connection',
    }),
  });

  const RESPONSE_JSON = await RESPONSE.json();

  return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
}


