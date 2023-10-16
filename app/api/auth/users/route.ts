/**
 * Get users
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 0;
  const uri = process.env.AUTH0_AUDIENCE +
      'users?q=&search_engine=v3&page=' +
      page + '&include_totals=true';
  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      'Accept': 'application/json',
    },
  });

  const res = await response.json();

  return Response.json(res, {status: res.statusCode});
}
