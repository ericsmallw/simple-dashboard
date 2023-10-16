/**
 * Resend verification email
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  // read userId from fetch request body
  const BODY = await request.json();

  const DATA = {
    'client_id': process.env.AUTH0_CLIENT_ID,
    'user_id': BODY.userId || '',
    'identity': {
      'user_id': BODY.userId.replace('auth0|', ''),
      'provider': 'auth0',
    },
  };
  const URL = `${process.env.AUTH0_AUDIENCE}jobs/verification_email`;
  const RESPONSE = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
    },
    body: JSON.stringify(DATA),
  });

  const RESPONSE_JSON = await RESPONSE.json();

  return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
}
