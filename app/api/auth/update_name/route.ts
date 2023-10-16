/**
 * Update user name
 * @param {Request} request
 * @constructor
 */
export async function PATCH(request: Request) {
  const BODY = await request.json();

  if (!BODY.name) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
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
      name: BODY.name,
    }),
  });

  const RESPONSE_JSON = await RESPONSE.json();

  return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
}


