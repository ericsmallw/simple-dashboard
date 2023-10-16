/**
 * Update user name
 * @param {Request} request
 * @constructor
 */
export async function PATCH(request: Request) {
  const body = await request.json();

  if (!body.name) {
    return Response.json({error: 'Missing required fields'}, {status: 400});
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
      name: body.name,
    }),
  });

  const res = await response.json();

  return Response.json(res, {status: res.statusCode});
}


