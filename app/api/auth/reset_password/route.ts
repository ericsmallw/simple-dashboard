/**
 * Resend verification email
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

  if (BODY.newPassword !== BODY.newPasswordAgain) {
    const ERROR = 'New passwords do not match';
    return Response.json({error: ERROR}, {status: 400});
  }

  if (BODY.newPassword.length < 8) {
    const ERROR = 'New password must be at least 8 characters long';
    return Response.json({error: ERROR}, {status: 400});
  }

  if (!/\d/.test(BODY.newPassword)) {
    const ERROR = 'New password must contain at least 1 number';
    return Response.json({error: ERROR}, {status: 400});
  }

  if (!/[A-Z]/.test(BODY.newPassword)) {
    const ERROR = 'New password must contain at least 1 uppercase letter';
    return Response.json({error: ERROR}, {status: 400});
  }

  if (!/[a-z]/.test(BODY.newPassword)) {
    const ERROR = 'New password must contain at least 1 lowercase letter';
    return Response.json({error: ERROR}, {status: 400});
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(BODY.newPassword)) {
    const ERROR = 'New password must contain at least 1 special character';
    return Response.json({error: ERROR}, {status: 400});
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


