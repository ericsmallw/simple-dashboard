/**
 * Get user details
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const PARSED_URL = new URL(request.url);
  const USER_ID = PARSED_URL.searchParams.get('userId');

  const RESPONSE = await fetch(
      `${process.env.AUTH0_AUDIENCE}users/${USER_ID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
          'Accept': 'application/json',
        },
      });

  const RESPONSE_JSON = await RESPONSE.json();

  return Response.json(RESPONSE_JSON, {status: RESPONSE_JSON.statusCode});
}
