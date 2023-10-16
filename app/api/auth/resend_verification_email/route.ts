/**
 * Resend verification email
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  // read userId from fetch request body
  const body = await request.json();

  const data = {
    'client_id': process.env.AUTH0_CLIENT_ID,
    'user_id': body.userId || '',
    'identity': {
      'user_id': body.userId.replace('auth0|', ''),
      'provider': 'auth0',
    },
  };
  const url = `${process.env.AUTH0_AUDIENCE}jobs/verification-email`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  return Response.json(res, {status: res.statusCode});
}
