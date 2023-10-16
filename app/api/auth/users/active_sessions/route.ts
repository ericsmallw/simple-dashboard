/**
 * Get active sessions
 * @param {Request} request
 * @constructor
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const uri = process.env.AUTH0_AUDIENCE +
      'users?q=last_login:[' + from + ' TO ' + to +
      ']&search_engine=v3&include_totals=true';

  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      'Accept': 'application/json',
    },
  });

  const res = await response.json();

  return Response.json(res.total, {status: res.statusCode});
}
