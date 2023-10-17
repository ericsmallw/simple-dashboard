/**
 * Get users
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const PARSED_URL = new URL(request.url);
  const PAGE = PARSED_URL.searchParams.get('page') || 0;
  const URI = process.env.AUTH0_AUDIENCE +
      'users?q=identities.connection:"'+
      process.env.AUTH0_CONNECTION +
      '"&search_engine=v3&page=' +
      PAGE + '&include_totals=true';
  const RESPONSE = await fetch(URI, {
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
