/**
 * Resend verification email
 * @param {Request} request
 * @constructor
 */
export async function PATCH(request: Request) {
  const body = await request.json();
  if (
    !body.oldPassword ||
    !body.newPassword ||
    !body.newPasswordAgain ||
    !body.userId ||
    !body.email
  ) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
  }

  if (body.newPassword !== body.newPasswordAgain) {
    const error = 'New passwords do not match';
    return Response.json({error}, {status: 400});
  }

  if (body.newPassword.length < 8) {
    const error = 'New password must be at least 8 characters long';
    return Response.json({error}, {status: 400});
  }

  if (!/\d/.test(body.newPassword)) {
    const error = 'New password must contain at least 1 number';
    return Response.json({error}, {status: 400});
  }

  if (!/[A-Z]/.test(body.newPassword)) {
    const error = 'New password must contain at least 1 uppercase letter';
    return Response.json({error}, {status: 400});
  }

  if (!/[a-z]/.test(body.newPassword)) {
    const error = 'New password must contain at least 1 lowercase letter';
    return Response.json({error}, {status: 400});
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.newPassword)) {
    const error = 'New password must contain at least 1 special character';
    return Response.json({error}, {status: 400});
  }

  const passResponse = await fetch(`${process.env.AUTH0_DOMAIN}oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'password',
      username: body.email,
      password: body.oldPassword,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
    }),
  });

  const passResBody = await passResponse.json();

  if (passResBody.error) {
    return Response.json(passResBody, {status: passResBody.statusCode});
  }

  const url = `${process.env.AUTH0_AUDIENCE}users/${body.userId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      password: body.newPassword,
      connection: 'Simple-Dashboard-Connection',
    }),
  });

  const res = await response.json();

  return Response.json(res, {status: res.statusCode});
}


